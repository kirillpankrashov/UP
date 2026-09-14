import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useCampaignAnalyticsStore } from '@/modules/Streamer/views/Campaigns/store'

import DatePicker from '../DatePicker.vue'

describe('Streamer Campaigns Analytics DatePicker', () => {
	const factory = () => {
		const wrapper = mount(DatePicker, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
			},
		})

		const analyticsStore = useCampaignAnalyticsStore()

		return {
			wrapper,
			analyticsStore,
		}
	}

	describe('Component rendering', () => {
		it('renders date picker with correct props', () => {
			const { wrapper } = factory()

			const datePicker = wrapper.findComponent({ name: 'ElDatePicker' })
			expect(datePicker.exists()).toBe(true)
			expect(datePicker.props()).toEqual(expect.objectContaining({
				type: 'daterange',
				rangeSeparator: '–',
				format: 'DD.MM.YYYY',
				clearable: false,
				size: 'large',
			}))
		})
	})

	describe('Store integration', () => {
		it('uses currentDates from store', async () => {
			const { wrapper, analyticsStore } = factory()
			const testDates: [Date, Date] = [new Date('2024-01-01'), new Date('2024-01-31')]

			analyticsStore.currentDates = testDates
			await nextTick()

			const datePicker = wrapper.findComponent({ name: 'ElDatePicker' })
			expect(datePicker.props('modelValue')).toEqual(testDates)
		})

		// it('calls fetchData on date change', async () => {
		// 	const { wrapper, analyticsStore } = factory()
		// 	const newDates: [Date, Date] = [new Date('2024-01-01'), new Date('2024-01-31')]

		// 	const datePicker = wrapper.findComponent({ name: 'ElDatePicker' })
		// 	await datePicker.trigger('change', newDates)

		// 	expect(analyticsStore.fetchData).toHaveBeenCalledOnce()
		// })
	})
})
