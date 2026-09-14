import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import BoxSize from '../BoxSize.vue'

describe('Streamer Settings BoxSize', () => {
	const factory = (props: any) => {
		const wrapper = mount(BoxSize, {
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

	it('show corresponding widget box size', async () => {
		const { wrapper, settingsStore } = factory({})

		await nextTick()

		expect(wrapper.find(`[data-test="box-size-${settingsStore.widget?.boxSize}"`).classes().includes('_active-size')).toBe(true)
	})
})
