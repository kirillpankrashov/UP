import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ReloadButton } from '@/components'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import PanelMobile from '../PanelMobile.vue'

vi.mock('vue-qr/src/packages/vue-qr.vue', () => ({
	default: {
		name: 'VueQr',
		template: '<div data-test="vue-qr-mock" />',
	},
}))

describe('Streamer Settings PanelMobile', () => {
	const factory = (props: any) => {
		const wrapper = mount(PanelMobile, {
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

	it('calls refreshObsLink when reset button is clicked', async () => {
		const { wrapper, settingsStore } = factory({})

		await nextTick()
		wrapper.findComponent(ReloadButton).trigger('click')

		expect(settingsStore.refreshObsLink).toHaveBeenCalled()
	})
})
