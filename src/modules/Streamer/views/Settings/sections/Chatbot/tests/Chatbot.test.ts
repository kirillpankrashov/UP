import { nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Platform } from '@/core/types'
import { i18n } from '@/core/i18n'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import Chatbot from '../Chatbot.vue'

vi.mock('vue-router', async () => {
	const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
	return {
		...actual,
		useRoute: vi.fn(),
	}
})

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

const StateStub = {
	name: 'State',
	template: '<div data-test="chatbot-state-stub" />',
}

const ElAlertStub = {
	name: 'ElAlert',
	props: ['title'],
	template: '<div data-test="chatbot-error-alert"><slot /></div>',
}

describe('Streamer Settings Chatbot', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.mocked(useRoute).mockReturnValue({ query: {} } as any)
	})

	const factory = (widgetPlatform: Platform | null, routeError = '') => {
		vi.mocked(useRoute).mockReturnValue({
			query: routeError ? { error: routeError } : {},
		} as any)

		const wrapper = mount(Chatbot, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					'router-link': true,
					State: StateStub,
					ElAlert: ElAlertStub,
				},
			},
		})

		const settingsStore = useSettingsStore()
		settingsStore.widget = widgetPlatform
			? ({
				...widgetData,
				platform: widgetPlatform,
			  } as any)
			: null

		return { wrapper, settingsStore }
	}

	it('does not render section when widget is null', async () => {
		const { wrapper } = factory(null)

		await nextTick()

		expect(wrapper.find('[data-test="settings-chatbot-section"]').exists()).toBe(false)
	})

	it('does not render section for VK_PLAY and TIKTOK platforms', async () => {
		const { wrapper: vkWrapper } = factory(Platform.VK_PLAY)
		await nextTick()
		expect(vkWrapper.find('[data-test="settings-chatbot-section"]').exists()).toBe(false)

		const { wrapper: ttWrapper } = factory(Platform.TIKTOK)
		await nextTick()
		expect(ttWrapper.find('[data-test="settings-chatbot-section"]').exists()).toBe(false)
	})

	it('renders section and State when platform is valid', async () => {
		const { wrapper } = factory(Platform.TWITCH)

		await nextTick()

		expect(wrapper.find('[data-test="settings-chatbot-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="chatbot-state-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="chatbot-error-alert"]').exists()).toBe(false)
	})

	it('renders error alert when route.query.error is invalid-platform', async () => {
		const { wrapper } = factory(Platform.TWITCH, 'invalid-platform')

		await nextTick()

		expect(wrapper.find('[data-test="settings-chatbot-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="chatbot-error-alert"]').exists()).toBe(true)
		expect(wrapper.text()).toContain('settings.chatbot.error')
	})
})

