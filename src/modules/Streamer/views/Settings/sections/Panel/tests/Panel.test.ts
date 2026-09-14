import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import Panel from '../Panel.vue'
import { PanelMobile, PanelObs } from '../sections'

vi.mock('vue-qr/src/packages/vue-qr.vue', () => ({
	default: {
		name: 'VueQr',
		template: '<div data-test="vue-qr-mock" />',
	},
}))

describe('Streamer Settings Panel', () => {
	const factory = (props: any) => {
		const wrapper = mount(Panel, {
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

	it('renders PanelMobile and PanelObs components', async () => {
		const { wrapper } = factory({})

		await nextTick()

		expect(wrapper.findComponent(PanelMobile).exists()).toBe(true)
		expect(wrapper.findComponent(PanelObs).exists()).toBe(true)
	})
})
