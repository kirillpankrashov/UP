import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { ElLoadingDirective } from 'element-plus'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import { Status } from '../components'
import Statuses from '../Statuses.vue'

describe('Streamer Settings Statuses', () => {
	const factory = (props: any) => {
		const wrapper = mount(Statuses, {
			directives: {
				loading: ElLoadingDirective,
			},
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

	const getStatus = (wrapper: ReturnType<typeof factory>['wrapper'], title: string) => {
		const statuses = wrapper.findAllComponents(Status)
		return statuses.find(step => step.props().title === title)
	}

	it('renders widget status correctly', async () => {
		const { wrapper, settingsStore } = factory({})

		await nextTick()

		const status = getStatus(wrapper, 'Widget')

		expect(status?.exists()).toBe(true)
		expect(status?.props('success')).toBe(settingsStore.widget?.enabled)
	})

	it('renders stream status correctly', async () => {
		const { wrapper, settingsStore } = factory({})

		await nextTick()

		const status = getStatus(wrapper, 'Livestream')

		expect(status?.exists()).toBe(true)
		expect(status?.props('success')).toBe(settingsStore.widget?.stream.enabled)
	})

	it('renders chatbot status correctly', async () => {
		const { wrapper, settingsStore } = factory({})

		await nextTick()

		const status = getStatus(wrapper, 'Chatbot')

		expect(status?.exists()).toBe(true)
		expect(status?.props('success')).toBe(settingsStore.widget?.botEnabled)
	})
})
