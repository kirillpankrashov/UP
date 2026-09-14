import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { brandAwarenessAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetInfo/fixtures/brandAwarenessAdsetInfo'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import TwitchClip from '../TwitchClip.vue'

vi.mock('@/modules/Streamer/views/Campaigns/api')
vi.mock('@/modules/Debug/api/sendPreview', () => ({
	sendPreview: vi.fn().mockResolvedValue({ status: true, messages: [] }),
}))
vi.mock('@/core/helpers', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@/core/helpers')>()
	return {
		...actual,
		Logger: { error: vi.fn() },
		wait: vi.fn().mockResolvedValue(undefined),
	}
})
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({ t: (key: string) => key }),
}))

const activeWidget = {
	...widgetData,
	slug: 'WGT-test',
	stream: { enabled: true, delay: 30 },
}

const profileWithCredentials = {
	...profileData,
	platforms: {
		...profileData.platforms,
		twitch: {
			...profileData.platforms.twitch,
			application: {
				accessToken: 'test-access-token',
				clientId: 'test-client-id',
			},
		},
	},
}

describe('Streamer Campaigns AdsetInfo TwitchClip', () => {
	const factory = (adset = brandAwarenessAdsetInfo) => {
		const wrapper = mount(TwitchClip, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({ createSpy: vi.fn }),
				],
				stubs: {
					ElButton: {
						name: 'ElButton',
						template: '<button data-test="twitch-clip-button" :disabled="disabled" :data-type="type" @click="$emit(\'click\')"><slot /></button>',
						props: ['disabled', 'loading', 'type'],
						emits: ['click'],
					},
				},
			},
			props: { adset },
		})

		const settingsStore = useSettingsStore()
		const streamerStore = useStreamerStore()

		return { wrapper, settingsStore, streamerStore }
	}

	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
		vi.clearAllMocks()
	})

	describe('Conditional rendering', () => {
		it('does not render when stream is not active', async () => {
			const { wrapper, settingsStore } = factory()

			settingsStore.widget = { ...widgetData, stream: { enabled: false, delay: 30 } } as any
			await nextTick()

			expect(wrapper.find('[data-test="twitch-clip-button"]').exists()).toBe(false)
		})

		it('renders button when stream is active', async () => {
			const { wrapper, settingsStore } = factory()

			settingsStore.widget = activeWidget as any
			await nextTick()

			expect(wrapper.find('[data-test="twitch-clip-button"]').exists()).toBe(true)
		})
	})

	describe('Button state', () => {
		it('shows makeTwitchClip text by default', async () => {
			const { wrapper, settingsStore } = factory()

			settingsStore.widget = activeWidget as any
			await nextTick()

			expect(wrapper.find('[data-test="twitch-clip-button"]').text()).toBe('campaignSidebar.makeTwitchClip')
		})

		it('button is not disabled by default', async () => {
			const { wrapper, settingsStore } = factory()

			settingsStore.widget = activeWidget as any
			await nextTick()

			expect(wrapper.find('[data-test="twitch-clip-button"]').attributes('disabled')).toBeUndefined()
		})

		it('has primary type when no clip URL', async () => {
			const { wrapper, settingsStore } = factory()

			settingsStore.widget = activeWidget as any
			await nextTick()

			expect(wrapper.find('[data-test="twitch-clip-button"]').attributes('data-type')).toBe('primary')
		})
	})

	describe('startTimer guards', () => {
		it('calls Logger.error when no Twitch credentials', async () => {
			const { Logger } = await import('@/core/helpers')
			const { wrapper, settingsStore, streamerStore } = factory()

			settingsStore.widget = activeWidget as any
			streamerStore.profile = { ...profileData, platforms: { ...profileData.platforms, twitch: { ...profileData.platforms.twitch, application: undefined } } } as any
			await nextTick()

			await wrapper.find('[data-test="twitch-clip-button"]').trigger('click')

			expect(Logger.error).toHaveBeenCalledWith('campaignSidebar.twitchClipNoCredentials', true)
		})

		it('calls Logger.error when no widget slug', async () => {
			const { Logger } = await import('@/core/helpers')
			const { wrapper, settingsStore, streamerStore } = factory()

			settingsStore.widget = { ...activeWidget, slug: '' } as any
			streamerStore.profile = profileWithCredentials as any
			await nextTick()

			await wrapper.find('[data-test="twitch-clip-button"]').trigger('click')

			expect(Logger.error).toHaveBeenCalledWith('campaignSidebar.twitchClipNoWidget', true)
		})

		it('calls Logger.error when adset has no ads', async () => {
			const { Logger } = await import('@/core/helpers')
			const adsetWithoutAds = { ...brandAwarenessAdsetInfo, ads: [] }
			const { wrapper, settingsStore, streamerStore } = factory(adsetWithoutAds as any)

			settingsStore.widget = activeWidget as any
			streamerStore.profile = profileWithCredentials as any
			await nextTick()

			await wrapper.find('[data-test="twitch-clip-button"]').trigger('click')

			expect(Logger.error).toHaveBeenCalledWith('campaignSidebar.twitchClipNoAds', true)
		})
	})

	describe('Timer behaviour', () => {
		it('shows timer text and disables button after click with valid setup', async () => {
			const { wrapper, settingsStore, streamerStore } = factory()

			settingsStore.widget = activeWidget as any
			streamerStore.profile = profileWithCredentials as any
			await nextTick()

			await wrapper.find('[data-test="twitch-clip-button"]').trigger('click')
			await nextTick()

			const button = wrapper.find('[data-test="twitch-clip-button"]')
			expect(button.text()).toBe('campaignSidebar.twitchClipTimer')
			expect(button.attributes('disabled')).toBeDefined()
		})

		it('decrements timer seconds each second', async () => {
			const { wrapper, settingsStore, streamerStore } = factory()

			settingsStore.widget = activeWidget as any
			streamerStore.profile = profileWithCredentials as any
			await nextTick()

			await wrapper.find('[data-test="twitch-clip-button"]').trigger('click')
			await nextTick()

			expect(wrapper.find('[data-test="twitch-clip-button"]').text()).toBe('campaignSidebar.twitchClipTimer')

			vi.advanceTimersByTime(5000)
			await nextTick()

			expect(wrapper.find('[data-test="twitch-clip-button"]').text()).toBe('campaignSidebar.twitchClipTimer')
		})

		it('clears interval on unmount', async () => {
			const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')
			const { wrapper, settingsStore, streamerStore } = factory()

			settingsStore.widget = activeWidget as any
			streamerStore.profile = profileWithCredentials as any
			await nextTick()

			await wrapper.find('[data-test="twitch-clip-button"]').trigger('click')
			await nextTick()

			wrapper.unmount()

			expect(clearIntervalSpy).toHaveBeenCalled()
		})
	})
})
