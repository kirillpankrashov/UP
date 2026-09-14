import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElButton } from '@/components/element-plus'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import WidgetPreview from '../WidgetPreview.vue'

vi.mock('@/modules/Streamer/views/Settings/api')
describe('Streamer Settings WidgetLink WidgetPreview', () => {
	const factory = (props: any) => {
		const wrapper = mount(WidgetPreview, {
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

	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.clearAllTimers()
	})

	it('sends widget preview on button click', async () => {
		const { wrapper, settingsStore } = factory({})

		await nextTick()

		await wrapper.findComponent(ElButton).trigger('click')

		expect(settingsStore.sendWidgetPreview).toHaveBeenCalled()
	})
})
