import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { PayoutType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { performanceAdset } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsets/fixtures/performanceAdset'

import Performance from '../Performance.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useCurrency: () => ({
		formatNumber: (value: number) => value.toString(),
	}),
}))

describe('Performance Component', () => {
	const factory = (props = {}) => {
		return mount(Performance, {
			global: {
				plugins: [i18n],
			},
			props: {
				adset: {
					...performanceAdset,
					...props,
				},
			},
		})
	}

	describe('Actions section', () => {
		it('displays daily actions when payableType is ACTIONS', () => {
			const wrapper = factory({
				payableType: PayoutType.ACTIONS,
				actions: 100,
			})

			expect(wrapper.text()).toContain('campaignRow.dailyActions')
			expect(wrapper.text()).toContain('100')
		})

		it('does not display actions section when payableType is IMPRESSIONS', () => {
			const wrapper = factory({
				payableType: PayoutType.IMPRESSIONS,
				actions: 100,
			})

			expect(wrapper.text()).not.toContain('campaignRow.dailyActions')
		})
	})

	describe('Impressions section', () => {
		it('displays daily impressions when payableType is IMPRESSIONS', () => {
			const wrapper = factory({
				payableType: PayoutType.IMPRESSIONS,
				impressions: 1000,
			})

			expect(wrapper.text()).toContain('campaignRow.dailyImpressions')
			expect(wrapper.text()).toContain('1000')
		})

		it('does not display impressions section when payableType is ACTIONS', () => {
			const wrapper = factory({
				payableType: PayoutType.ACTIONS,
				impressions: 1000,
			})

			expect(wrapper.text()).not.toContain('campaignRow.dailyImpressions')
		})
	})

	describe('End date section', () => {
		it('displays end date', () => {
			const wrapper = factory({
				dates: {
					end: '2024-12-31',
				},
			})

			expect(wrapper.text()).toContain('campaignRow.dateEnd')
			expect(wrapper.text()).toContain('2024-12-31')
		})

		it('updates end date when adset prop changes', async () => {
			const wrapper = factory({
				dates: {
					end: '2024-12-31',
				},
			})

			await wrapper.setProps({
				adset: {
					...performanceAdset,
					dates: {
						start: '2024-12-31',
						end: '2025-01-01',
					},
				},
			})

			expect(wrapper.text()).toContain('2025-01-01')
		})
	})

	it('formats numbers using formatNumber', () => {
		const wrapper = factory({
			payableType: PayoutType.ACTIONS,
			actions: 1234,
		})

		expect(wrapper.text()).toContain('1234') // Мок возвращает строковое представление числа
	})
})
