import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { Platform } from '@/core/types'
import { i18n } from '@/core/i18n'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import TwitchExtensionBrandis from '../TwitchExtensionBrandis.vue'

describe('Streamer Settings TwitchExtensionBrandis', () => {
	const factory = (props: any) => {
		const wrapper = mount(TwitchExtensionBrandis, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
			props,
		})

		const settingsStore = useSettingsStore()
		settingsStore.widget = widgetData

		return { wrapper, settingsStore }
	}

	it('doesn\'t render component if widget platform isn\'t Twitch', async () => {
		const { wrapper, settingsStore } = factory({})

		settingsStore.widget!.platform = Platform.YOUTUBE

		await nextTick()

		expect(wrapper.find('[data-test="settings-twitch-extension-section"]').exists()).toBe(false)
	})

	it('calls the checkBrandisExtension method when the check button is clicked', async () => {
		const { wrapper, settingsStore } = factory({})

		settingsStore.widget!.platform = Platform.TWITCH

		await nextTick()

		await wrapper.find('[data-test="twitch-extension-check-btn"]').trigger('click')

		expect(settingsStore.checkBrandisExtension).toHaveBeenCalled()
	})
})
