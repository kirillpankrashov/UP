import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { useCurrency } from '@/core/hooks'
import { i18n } from '@/core/i18n'
import { analytcsData } from '@/modules/Streamer/views/Link/api/getAnalytics/fixtures/analytcsData'
import { statisticsData } from '@/modules/Streamer/views/Link/api/getStatistics/fixtures/statisticsData'
import { useLinkAnalyticsStore } from '@/modules/Streamer/views/Link/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import Stats from '../Stats.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Link Analytics Stats', () => {
	const { formatCurrency, formatNumber } = useCurrency()

	const factory = () => {
		const wrapper = mount(Stats, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link', 'StatCard'],
			},
		})

		const streamerStore = useStreamerStore()
		streamerStore.profile = profileData

		const analyticsStore = useLinkAnalyticsStore()
		analyticsStore.analytics = analytcsData
		analyticsStore.statistics = statisticsData

		return { wrapper, analyticsStore, streamerStore }
	}

	it('shows cpm and impressions cards if isPreemium true', async () => {
		const { wrapper, analyticsStore } = factory()

		analyticsStore.analytics!.isPremium = false

		expect(wrapper.find('[data-test="link-analytics-stats-cpm"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="link-analytics-stats-impressions"]').exists()).toBe(false)

		analyticsStore.analytics!.isPremium = true

		await nextTick()

		expect(wrapper.find('[data-test="link-analytics-stats-cpm"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="link-analytics-stats-impressions"]').exists()).toBe(true)
	})

	it('passes correct values to StatCard components', async () => {
		const { wrapper, analyticsStore, streamerStore } = factory()

		analyticsStore.analytics!.isPremium = true

		await nextTick()

		const currency = streamerStore.profile!.currency
		const { analytics, statistics } = analyticsStore

		expect(wrapper.find('[data-test="link-analytics-stats-supporters"]').attributes().value).toBe(formatNumber(statistics?.supporters.monthly || 0, false, currency))
		expect(wrapper.find('[data-test="link-analytics-stats-revenueDay"]').attributes().value).toBe(formatCurrency(analytics!.revenue.day, true, currency))
		expect(wrapper.find('[data-test="link-analytics-stats-cpm"]').attributes().value).toBe(formatNumber(analytics?.avgCpm || 0, true, currency))
		expect(wrapper.find('[data-test="link-analytics-stats-points"]').attributes().value).toBe(formatNumber(statistics?.points.monthly || 0, false, currency))
		expect(wrapper.find('[data-test="link-analytics-stats-revenueMonth"]').attributes().value).toBe(formatCurrency(analytics!.revenue.month, true, currency))
		expect(wrapper.find('[data-test="link-analytics-stats-impressions"]').attributes().value).toBe(formatNumber(analytics?.impressions || 0, false, currency))
	})
})
