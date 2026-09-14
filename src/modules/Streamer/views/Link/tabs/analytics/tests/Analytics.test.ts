import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useLinkAnalyticsStore } from '@/modules/Streamer/views/Link/store'

import Analytics from '../Analytics.vue'
import { Stats, Tops } from '../sections'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Link Analytics', () => {
	const factory = () => {
		const wrapper = mount(Analytics, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
		})

		const analyticsStore = useLinkAnalyticsStore()

		return { wrapper, analyticsStore }
	}

	it('renders correctly', async () => {
		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.findComponent(Stats).exists()).toBe(true)
		expect(wrapper.findComponent(Tops).exists()).toBe(true)
	})

	it('fetches analytics, statistics, and tops on mount', () => {
		const { analyticsStore } = factory()

		expect(analyticsStore.fetchAnalytics).toHaveBeenCalled()
		expect(analyticsStore.fetchStatistics).toHaveBeenCalled()
		expect(analyticsStore.fetchTops).toHaveBeenCalled()
	})
})
