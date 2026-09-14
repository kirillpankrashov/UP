import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import WidgetLink from '../WidgetLink.vue'

describe('Streamer Settings WidgetLink', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = (props: any) => {
		const wrapper = mount(WidgetLink, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: {
					DashboardSection: {
						name: 'DashboardSection',
						template: '<div><slot name="left" /><slot /></div>',
					},
					OptionDrag: {
						name: 'OptionDrag',
						props: ['url'],
						template: '<div data-test="option-drag-stub" />',
					},
					OptionLink: {
						name: 'OptionLink',
						props: ['url'],
						template: '<div data-test="option-link-stub" />',
					},
					OptionWithSocket: {
						name: 'OptionWithSocket',
						template: '<div data-test="option-with-socket-stub" />',
					},
					WidgetPreview: {
						name: 'WidgetPreview',
						template: '<div data-test="widget-preview-stub" />',
					},
					Advice: {
						name: 'Advice',
						props: ['id', 'type', 'title'],
						template: '<div data-test="advice-stub"><slot /></div>',
					},
					// In case any stub still uses router-link.
					'router-link': true,
				},
			},
			props,
		})

		const settingsStore = useSettingsStore()
		settingsStore.widget = widgetData

		return { wrapper, settingsStore }
	}

	it('renders all child components', async () => {
		const { wrapper } = factory({})

		await nextTick()

		expect(wrapper.find('[data-test="option-drag-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="option-link-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="option-with-socket-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="widget-preview-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="advice-stub"]').exists()).toBe(true)
	})
})
