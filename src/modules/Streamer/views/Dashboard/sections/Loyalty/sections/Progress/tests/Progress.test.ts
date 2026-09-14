import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useDashboardStore } from '@/modules/Streamer/views/Dashboard/store'
import { tierData } from '@/modules/Streamer/views/Dashboard/store/__fixtures__/tierData'

import { Level, Line } from '../components'
import Progress from '../Progress.vue'

describe('Streamer Dashboard Loyalty Progress', () => {
	const factory = (props: any) => {
		const wrapper = mount(Progress, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
			props,
		})

		const dashboardStore = useDashboardStore()
		dashboardStore.tier.data = tierData

		return { wrapper }
	}

	const getLevel = (wrapper: ReturnType<typeof factory>['wrapper'], level: number) => {
		const levels = wrapper.findAllComponents(Level)
		return levels.find(l => l.props().level === level)
	}

	const getLine = (wrapper: ReturnType<typeof factory>['wrapper'], level: number) => {
		const lines = wrapper.findAllComponents(Line)
		return lines.find(l => l.props().level === level)
	}

	it('renders levels and lines', async () => {
		const { wrapper } = factory({})

		expect(getLevel(wrapper, 0)?.exists()).toBe(true)
		expect(getLine(wrapper, 0)?.exists()).toBe(true)

		expect(getLevel(wrapper, 1)?.exists()).toBe(true)
		expect(getLine(wrapper, 1)?.exists()).toBe(true)

		expect(getLevel(wrapper, 2)?.exists()).toBe(true)
		expect(getLine(wrapper, 2)?.exists()).toBe(true)

		expect(getLevel(wrapper, 3)?.exists()).toBe(true)
		expect(getLine(wrapper, 3)?.exists()).toBe(true)

		expect(getLevel(wrapper, 4)?.exists()).toBe(true)
		expect(getLine(wrapper, 4)?.exists()).toBe(true)

		expect(getLevel(wrapper, 5)?.exists()).toBe(true)
	})
})
