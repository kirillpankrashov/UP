import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { prerollAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getPrerollAdsetInfo/fixtures/prerollAdsetInfo'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'

import Preroll from '../Preroll.vue'

interface IPlayer {
  controls: ReturnType<typeof vi.fn>
  on: ReturnType<typeof vi.fn>
  play: ReturnType<typeof vi.fn>
  pause: ReturnType<typeof vi.fn>
  paused: ReturnType<typeof vi.fn>
}

const createMockPlayer = (): IPlayer => ({
	controls: vi.fn(),
	on: vi.fn(),
	play: vi.fn(),
	pause: vi.fn(),
	paused: vi.fn(),
})

const mockVideojs = vi.fn()
vi.stubGlobal('videojs', mockVideojs)

vi.mock('@/assets/img/icons/play.svg', () => ({
	default: {
		template: '<svg data-test="play-icon"><path /></svg>',
	},
}))

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetInfo Creative Preroll', () => {
	let mockPlayer: IPlayer

	beforeEach(() => {
		mockPlayer = createMockPlayer()
		mockVideojs.mockReset()
		mockVideojs.mockReturnValue(mockPlayer)
	})

	const factory = (props = {}) => {
		const wrapper = mount(Preroll, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					TextLink: true,
					CopyLink: true,
				},
			},
			props: {
				adset: {
					...prerollAdsetInfo,
					...props,
				},
			},
		})

		const campaignsStore = useCampaignsStore()

		return { wrapper, player: mockPlayer, campaignsStore }
	}

	describe('Video rendering', () => {
		it('renders video element when source is provided', async () => {
			const { wrapper } = factory({
				attachments: {
					unit: {
						path: 'video.mp4',
					},
				},
			})

			await nextTick()
			expect(wrapper.find('video').exists()).toBe(true)
		})

		it('does not render video when no source', async () => {
			const { wrapper } = factory({
				attachments: {
					unit: {
						path: null,
					},
				},
			})

			await nextTick()
			expect(wrapper.find('video').exists()).toBe(false)
		})

		it('renders gif as background image when source is gif', async () => {
			const { wrapper } = factory({
				attachments: {
					unit: {
						path: 'animation.gif',
					},
				},
			})

			await nextTick()
			const gifContainer = wrapper.find('.bg-cover')
			expect(gifContainer.exists()).toBe(true)
			expect(gifContainer.attributes('style')).toContain('animation.gif')
		})
	})

	describe('Video controls', () => {
		it('shows play button when video is not playing', async () => {
			const { wrapper } = factory({
				attachments: {
					unit: {
						path: 'video.mp4',
					},
				},
			})

			await nextTick()
			expect(wrapper.find('[data-test="play-icon"]').exists()).toBe(true)
		})

		it('hides play button when video is playing', async () => {
			const { wrapper } = factory({
				attachments: {
					unit: {
						path: 'video.mp4',
					},
				},
			})

			await nextTick()
			wrapper.vm.isPlaying = true
			await nextTick()

			expect(wrapper.find('[data-test="play-icon"]').exists()).toBe(false)
		})

		it('toggles video play/pause on click', async () => {
			const { wrapper } = factory({
				attachments: {
					unit: {
						path: 'video.mp4',
					},
				},
			})

			await nextTick()

			mockPlayer.paused.mockReturnValue(true)
			await wrapper.find('video').trigger('click')
			expect(mockPlayer.play).toHaveBeenCalled()
			expect(wrapper.vm.isPlaying).toBe(true)

			mockPlayer.paused.mockReturnValue(false)
			await wrapper.find('video').trigger('click')
			expect(mockPlayer.pause).toHaveBeenCalled()
			expect(wrapper.vm.isPlaying).toBe(false)
		})

		it('handles video end event', async () => {
			const { wrapper } = factory({
				attachments: {
					unit: {
						path: 'video.mp4',
					},
				},
			})

			await nextTick()
			wrapper.vm.isPlaying = true

			const [[, callback]] = mockPlayer.on.mock.calls
			callback()

			expect(wrapper.vm.isPlaying).toBe(false)
		})
	})

	// Специфичные тесты для Preroll компонента
	describe('Description and links', () => {
		it('displays video description text', () => {
			const { wrapper } = factory({
				videoDescriptionText: 'Test description',
			})

			expect(wrapper.text()).toContain('Test description')
		})

		it('renders download link with correct props', () => {
			const { wrapper } = factory({
				attachments: {
					unit: {
						path: 'video.mp4',
						basename: 'video.mp4',
					},
				},
			})

			const downloadLink = wrapper.findComponent({ name: 'TextLink' })
			expect(downloadLink.props()).toMatchObject({
				href: 'video.mp4',
				target: '_blank',
			})
		})

		it('renders copy description link with correct props', () => {
			const { wrapper } = factory({
				videoDescriptionText: 'Test description',
			})

			const copyLinks = wrapper.findAllComponents({ name: 'CopyLink' })
			expect(copyLinks[0].props()).toEqual(expect.objectContaining({
				link: 'Test description',
				label: 'campaignSidebar.copyDescription',
			}))
		})

		it('fetches preroll link on copy', async () => {
			const { wrapper, campaignsStore } = factory({
				slug: 'test-slug',
			})

			const copyLinks = wrapper.findAllComponents({ name: 'CopyLink' })
			await copyLinks[1].props().link()

			expect(campaignsStore.fetchPrerollLink).toHaveBeenCalledWith('test-slug')
		})
	})

	describe('VideoJS initialization', () => {
		it('initializes videojs with correct options', async () => {
			factory({
				attachments: {
					unit: {
						path: 'video.mp4',
					},
				},
			})

			await nextTick()

			expect(mockVideojs).toHaveBeenCalled()
			expect(mockPlayer.controls).toHaveBeenCalledWith(false)
			expect(mockPlayer.on).toHaveBeenCalledWith('ended', expect.any(Function))
		})

		it('does not initialize videojs for gif', async () => {
			mockVideojs.mockReset()

			factory({
				attachments: {
					unit: {
						path: 'animation.gif',
					},
				},
			})

			await nextTick()
			expect(mockVideojs).not.toHaveBeenCalled()
		})
	})
})
