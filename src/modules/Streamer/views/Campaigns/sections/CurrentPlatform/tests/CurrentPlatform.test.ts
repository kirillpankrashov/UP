import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { Platform } from '@/core/types'
import { i18n } from '@/core/i18n'
import { useAppStore } from '@/core/store'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import CurrentPlatform from '../CurrentPlatform.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns CurrentPlatform Component', () => {
	const factory = (platform = Platform.TWITCH) => {
		const wrapper = mount(CurrentPlatform, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					'router-link': true,
					TwitchIcon: true,
					YoutubeIcon: true,
					TrovoIcon: true,
					VkPlayIcon: true,
					TiktokIcon: true,
				},
			},
		})

		const settingsStore = useSettingsStore()
		const appStore = useAppStore()

		settingsStore.widget = {
			...widgetData,
			platform,
		}

		return { wrapper, settingsStore, appStore }
	}

	describe('Component rendering', () => {
		it('does not render when widget is null', () => {
			const { wrapper, settingsStore } = factory()
			settingsStore.widget = null

			expect(wrapper.find('#campaigns-current-platform').exists()).toBe(false)
		})

		it('renders title', async () => {
			const { wrapper } = factory()

			await nextTick()

			expect(wrapper.text()).toContain('campaigns.platforms.title')
		})
	})

	describe('Platform icons', () => {
		it('renders Twitch icon and text for Twitch platform', async () => {
			const { wrapper } = factory(Platform.TWITCH)

			await nextTick()

			expect(wrapper.find('[data-test="current-platform-twitch"]').exists()).toBe(true)
			expect(wrapper.text()).toContain('Twitch')
		})

		it('renders YouTube icon and text for YouTube platform', async () => {
			const { wrapper } = factory(Platform.YOUTUBE)

			await nextTick()

			expect(wrapper.find('[data-test="current-platform-youtube"]').exists()).toBe(true)
			expect(wrapper.text()).toContain('Youtube')
		})

		it('renders Trovo icon and text for Trovo platform', async () => {
			const { wrapper } = factory(Platform.TROVO)

			await nextTick()

			expect(wrapper.find('[data-test="current-platform-trovo"]').exists()).toBe(true)
			expect(wrapper.text()).toContain('Trovo')
		})

		it('renders VK Play icon and text for VK Play platform', async () => {
			const { wrapper } = factory(Platform.VK_PLAY)

			await nextTick()

			expect(wrapper.find('[data-test="current-platform-vkplay"]').exists()).toBe(true)
			expect(wrapper.text()).toContain('VK Play')
		})

		it('renders TikTok icon and text for TikTok platform', async () => {
			const { wrapper } = factory(Platform.TIKTOK)

			await nextTick()

			expect(wrapper.find('[data-test="current-platform-tiktok"]').exists()).toBe(true)
			expect(wrapper.text()).toContain('TikTok')
		})
	})

	describe('Responsive behavior', () => {
		it('hides platform text on mobile', async () => {
			const { wrapper, appStore } = factory(Platform.TWITCH)

			appStore.isMobile = true
			await nextTick()

			const platformText = wrapper.find('._text-m-bold.uppercase')
			expect(platformText.isVisible()).toBe(false)
		})

		it('shows platform text on desktop', async () => {
			const { wrapper, appStore } = factory(Platform.TWITCH)

			appStore.isMobile = false
			await nextTick()

			const platformText = wrapper.find('._text-m-bold.uppercase')
			expect(platformText.isVisible()).toBe(true)
		})
	})
})
