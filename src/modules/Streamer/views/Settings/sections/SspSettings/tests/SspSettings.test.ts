import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { yandexTextAdsetShort } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetsShort/fixtures/yandexTextAdsetShort'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import { SspMedia, SspText } from '../sections'
import SspSettings from '../SspSettings.vue'

describe('Streamer Settings SspSettings', () => {
	const factory = (props: any) => {
		const wrapper = mount(SspSettings, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
			props,
		})

		const settingsStore = useSettingsStore()
		const campaignsStore = useCampaignsStore()

		settingsStore.widget = widgetData
		campaignsStore.activeCampaignsShort.data.active = [yandexTextAdsetShort]
		campaignsStore.activeCampaignsShort.data.inactive = []

		return { wrapper, settingsStore, campaignsStore }
	}

	it('renders SspSettings correctly', async () => {
		const { wrapper } = factory({})

		await nextTick()

		expect(wrapper.findComponent(SspMedia).exists()).toBe(true)
		expect(wrapper.findComponent(SspText).exists()).toBe(true)
	})
})
