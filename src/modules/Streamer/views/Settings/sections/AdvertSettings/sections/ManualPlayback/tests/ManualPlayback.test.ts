import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { AdvertisingMode } from '@/core/types'
import { i18n } from '@/core/i18n'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import ManualPlayback from '../ManualPlayback.vue'

describe('Streamer Settings ManualPlayback', () => {
	const factory = (props: any) => {
		const wrapper = mount(ManualPlayback, {
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

	it('sends manual', async () => {
		const { wrapper, settingsStore } = factory({})

		settingsStore.widget!.advertising.mode = AdvertisingMode.MANUAL
		settingsStore.widget!.adManualEnabled = true

		await nextTick()

		await wrapper.find('[data-test="settings-manual-playback-btn"]').trigger('click')

		expect(settingsStore.sendManual).toBeCalled()
	})
})
