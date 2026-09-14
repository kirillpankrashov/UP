import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { performanceAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsetInfo/fixtures/performanceAdsetInfo'

import Performance from '../Performance.vue'

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

describe('Partner Agency AdsetInfo Creative Performance', () => {
	let mockPlayer: IPlayer

	beforeEach(() => {
		mockPlayer = createMockPlayer()
		mockVideojs.mockReset()
		mockVideojs.mockReturnValue(mockPlayer)
		vi.clearAllMocks()
	})

	const factory = (props: any = {}) => {
		const wrapper = mount(Performance, {
			global: {
				plugins: [i18n],
			},
			props: {
				adset: {
					...performanceAdsetInfo,
					...props,
					attachments: {
						...performanceAdsetInfo.attachments,
						...props.attachments,
					},
				},
			},
		})

		return { wrapper }
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
			expect(wrapper.find('[data-test="video-container"]').exists()).toBe(false)
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
			expect(wrapper.find('video').exists()).toBe(false)
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
			;(wrapper.vm as any).isPlaying = true
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
			expect((wrapper.vm as any).isPlaying).toBe(true)

			mockPlayer.paused.mockReturnValue(false)

			await wrapper.find('video').trigger('click')
			expect(mockPlayer.pause).toHaveBeenCalled()
			expect((wrapper.vm as any).isPlaying).toBe(false)
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
			;(wrapper.vm as any).isPlaying = true
			await nextTick()

			const [[, callback]] = mockPlayer.on.mock.calls
			callback()

			expect((wrapper.vm as any).isPlaying).toBe(false)
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

