import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { useCampaignAnalyticsStore } from '@/modules/Streamer/views/Campaigns/store'

import ReportBtn from '../ReportBtn.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => {
			const translations = {
				'campaigns.analytics.reportBtn.title': 'Full Report',
				'campaigns.analytics.reportBtn.shortTitle': 'Report',
				'campaigns.analytics.reportBtn.loading': 'Loading...',
				'campaigns.analytics.reportBtn.noData': 'No Data',
			}
			return translations[key as keyof typeof translations] || key
		},
	}),
}))

describe('ReportBtn Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(ReportBtn, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					ArrowIcon: true,
					RefreshIcon: true,
				},
			},
			props: {
				adset: brandAwarenessCustomAdset,
				...props,
			},
		})

		const analyticsStore = useCampaignAnalyticsStore()

		return { wrapper, analyticsStore }
	}

	describe('Button states', () => {
		it('shows full title when not small', async () => {
			const { wrapper } = factory({ isSmall: false })

			await nextTick()
			expect(wrapper.text()).toContain('Full Report')
		})

		it('shows short title when small', async () => {
			const { wrapper } = factory({ isSmall: true })

			await nextTick()
			expect(wrapper.text()).toContain('Report')
		})
	})

	describe('Click handling', () => {
		it('calls showAnalytics on click', async () => {
			const { wrapper, analyticsStore } = factory()

			await nextTick()
			await wrapper.find('[data-test="campaigns-report-btn"]').trigger('click')

			expect(analyticsStore.showAnalytics).toHaveBeenCalledOnce()
			expect(analyticsStore.showAnalytics).toHaveBeenCalledWith(brandAwarenessCustomAdset)
		})

		it('does not call showAnalytics when already fetching', async () => {
			const { wrapper, analyticsStore } = factory()

			analyticsStore.isFetchingData = true

			await nextTick()
			await wrapper.find('[data-test="campaigns-report-btn"]').trigger('click')

			expect(analyticsStore.showAnalytics).not.toHaveBeenCalled()
		})

		it('shows no data message temporarily when no data returned', async () => {
			vi.useFakeTimers()
			const { wrapper, analyticsStore } = factory()

			analyticsStore.data = []

			await nextTick()
			await wrapper.find('[data-test="campaigns-report-btn"]').trigger('click')

			expect(wrapper.text()).toContain('No Data')

			vi.advanceTimersByTime(3000)
			await nextTick()

			expect(wrapper.text()).toContain('Full Report')
			vi.useRealTimers()
		})
	})

	it('prevents event propagation on click', async () => {
		const { wrapper } = factory()
		const clickEvent = { stopPropagation: vi.fn() }

		await nextTick()
		await wrapper.find('[data-test="campaigns-report-btn"]').trigger('click', clickEvent)

		expect(clickEvent.stopPropagation).toHaveBeenCalled()
	})
})
