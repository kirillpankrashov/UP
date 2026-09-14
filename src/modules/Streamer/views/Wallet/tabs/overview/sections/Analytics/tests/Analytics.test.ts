import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import moment from 'moment'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useWalletAnalyticsStore } from '@/modules/Streamer/views/Wallet/store'

import Analytics from '../Analytics.vue'

describe('Streamer Wallet Analytics', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = () => {
		const wrapper = mount(Analytics, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: {
					DatePicker: {
						name: 'DatePicker',
						template: '<div data-test="wallet-analytics-datepicker-stub" />',
					},
					Graph: {
						name: 'Graph',
						template: '<div data-test="wallet-analytics-graph-stub" />',
					},
					Line: {
						name: 'Line',
						template: '<div data-test="wallet-analytics-line-stub" />',
					},
				},
			},
		})

		const analyticsStore = useWalletAnalyticsStore()

		return { wrapper, analyticsStore }
	}

	it('renders DatePicker, Graph and Line sections', async () => {
		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.find('[data-test="wallet-analytics-datepicker-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="wallet-analytics-graph-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="wallet-analytics-line-stub"]').exists()).toBe(true)
	})

	it('calls fetchAnalytics on month change', async () => {
		const { analyticsStore } = factory()

		await nextTick()

		analyticsStore.month = moment().subtract(1, 'month').toDate()

		await nextTick()

		expect(analyticsStore.fetchAnalytics).toHaveBeenCalledOnce()
	})
})
