import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { Dashboard } from '@/modules/Streamer/views/Dashboard'
import {
	Greeting,
	Loyalty,
	Resources,
	Setup,
} from '@/modules/Streamer/views/Dashboard/sections'
import { useDashboardStore } from '@/modules/Streamer/views/Dashboard/store'

vi.mock('vue-router')
vi.mock('@/core/helpers')
vi.mock('@/core/hooks', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@/core/hooks')>()
	return {
		...actual,
		useLocale: () => ({
			t: (key: string) => key,
		}),
	}
})

describe('Streamer Dashboard', () => {
	const factory = () => {
		const wrapper = mount(Dashboard, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: ['router-link'],
			},
		})

		const dashboardStore = useDashboardStore()

		return { wrapper, dashboardStore }
	}

	it('calls functions on dashboard load', () => {
		const { dashboardStore } = factory()

		expect(dashboardStore.fetchCheckList).toHaveBeenCalled()
		expect(dashboardStore.fetchTier).toHaveBeenCalled()
	})

	it('renders properly', () => {
		const { wrapper } = factory()

		expect(wrapper.findComponent(Greeting).exists()).toBe(true)
		expect(wrapper.findComponent(Loyalty).exists()).toBe(true)
		expect(wrapper.findComponent(Resources).exists()).toBe(true)
		expect(wrapper.findComponent(Setup).exists()).toBe(true)
	})
})
