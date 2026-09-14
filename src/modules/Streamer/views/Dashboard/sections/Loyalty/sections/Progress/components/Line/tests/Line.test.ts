import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useDashboardStore } from '@/modules/Streamer/views/Dashboard/store'
import { tierData } from '@/modules/Streamer/views/Dashboard/store/__fixtures__/tierData'

import Line from '../Line.vue'

describe('Streamer Dashboard Loyalty Progress Line', () => {
	const factory = (props: any) => {
		const wrapper = mount(Line, {
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

	it('calculates currentLevelProgress correctly', async () => {
		const { wrapper } = factory({
			level: 1,
		})

		await nextTick()

		expect(wrapper.vm.progressPerLevel).toBe(28)
	})
})
