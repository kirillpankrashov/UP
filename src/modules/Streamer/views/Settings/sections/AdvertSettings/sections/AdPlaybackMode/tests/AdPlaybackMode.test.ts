import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { AdvertisingMode, DomainName } from '@/core/types'
import { i18n } from '@/core/i18n'
import { useAppStore } from '@/core/store'
import { appStoreData } from '@/core/store/__fixtures__/appData'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import AdPlaybackMode from '../AdPlaybackMode.vue'

describe('Streamer Settings AdPlaybackMode', () => {
	const factory = (props: any) => {
		const wrapper = mount(AdPlaybackMode, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
			props,
		})

		const appStore = useAppStore()
		appStore.$reset()
		appStore.$state = appStoreData

		const settingsStore = useSettingsStore()
		settingsStore.widget = widgetData

		return { wrapper, settingsStore, appStore }
	}

	it(`sets advertising mode to AUTO if MANUAL mode is selected and domain name is ${DomainName.STREAMO}`, async () => {
		const { settingsStore, appStore } = factory({})

		settingsStore.widget!.advertising.mode = AdvertisingMode.MANUAL
		appStore.domain!.name = DomainName.STREAMO

		await nextTick()

		expect(settingsStore.widget?.advertising.mode).toBe(AdvertisingMode.AUTO)
	})

	it(`does not change advertising mode if MANUAL mode is selected and domain name is not ${DomainName.STREAMO}`, async () => {
		const { settingsStore, appStore } = factory({})

		settingsStore.widget!.advertising.mode = AdvertisingMode.MANUAL
		appStore.domain!.name = DomainName.UPLIFY

		await nextTick()

		expect(settingsStore.widget?.advertising.mode).toBe(AdvertisingMode.MANUAL)
	})
})
