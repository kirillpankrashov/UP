import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { AdvertisingMode } from '@/core/types'
import { i18n } from '@/core/i18n'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import AdvertSettings from '../AdvertSettings.vue'
import { BannerTimeout, ManualPlayback } from '../sections'

describe('Streamer Settings AdvertSettings', () => {
	const factory = (props: any) => {
		const wrapper = mount(AdvertSettings, {
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

	it(`renders BannerTimeout component if advertising mode is ${AdvertisingMode.AUTO}`, async () => {
		const { wrapper, settingsStore } = factory({})

		settingsStore.widget!.advertising.mode = AdvertisingMode.AUTO

		await nextTick()

		expect(wrapper.findComponent(BannerTimeout).exists()).toBe(true)
		expect(wrapper.findComponent(ManualPlayback).exists()).toBe(false)
	})

	it(`renders BannerTimeout component if advertising mode is ${AdvertisingMode.MANUAL}`, async () => {
		const { wrapper, settingsStore } = factory({})

		settingsStore.widget!.advertising.mode = AdvertisingMode.MANUAL

		await nextTick()

		expect(wrapper.findComponent(BannerTimeout).exists()).toBe(false)
		expect(wrapper.findComponent(ManualPlayback).exists()).toBe(true)
	})
})
