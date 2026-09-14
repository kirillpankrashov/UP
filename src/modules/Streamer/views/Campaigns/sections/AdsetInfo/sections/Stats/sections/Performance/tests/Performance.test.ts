import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { PayoutType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { performanceAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsetInfo/fixtures/performanceAdsetInfo'

import Performance from '../Performance.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useCurrency: () => ({
		formatCurrency: (value: number) => `${value} USD`,
		formatNumber: (value: number) => value.toString(),
	}),
}))

describe('Streamer Campaigns AdsetInfo Stats Performance', () => {
	const factory = (props = {}) => {
		return mount(Performance, {
			global: {
				plugins: [i18n],
			},
			props: {
				adset: {
					...performanceAdsetInfo,
					payableType: PayoutType.ACTIONS,
					...props,
				},
			},
		})
	}

	describe('Revenue section', () => {
		it('displays formatted current revenue', () => {
			const wrapper = factory({
				income: {
					current: 1000,
				},
			})

			expect(wrapper.find('[data-test="campaigns-stats-total-revenue"]').text()).toBe('1000 USD')
		})

		it('displays revenue label', () => {
			const wrapper = factory()

			expect(wrapper.text()).toContain('campaignSidebar.revenue')
		})

		it('contains link to revenue calculation explanation', () => {
			const wrapper = factory()

			const link = wrapper.find('[data-test="campaigns-stats-revenue-link"]')
			expect(link.exists()).toBe(true)
			expect(link.attributes('target')).toBe('_blank')
			expect(link.text()).toContain('campaigns.advice.potentialIncome.link')
		})
	})

	describe('CTR section', () => {
		it('displays current CTR', () => {
			const wrapper = factory({
				ctr: {
					current: 2.5,
					target: 3.0,
					global: 2.0,
				},
			})

			expect(wrapper.find('[data-test="campaigns-stats-ctr"]').text()).toBe('2.5%')
		})

		it('applies success class when CTR meets target', () => {
			const wrapper = factory({
				ctr: {
					current: 3.5,
					target: 3.0,
				},
			})

			expect(wrapper.find('[data-test="campaigns-stats-ctr"]').classes()).toContain('text-success')
		})

		it('applies danger class when CTR is below target', () => {
			const wrapper = factory({
				ctr: {
					current: 2.5,
					target: 3.0,
				},
			})

			expect(wrapper.find('[data-test="campaigns-stats-ctr"]').classes()).toContain('text-danger')
		})

		it('uses global CTR as target when target is null', () => {
			const wrapper = factory({
				ctr: {
					current: 2.5,
					target: null,
					global: 3.0,
				},
			})

			const ctrElement = wrapper.find('[data-test="campaigns-stats-ctr"]')
			expect(ctrElement.classes()).toContain('text-danger')
		})

		it('contains link to CTR improvement guide', () => {
			const wrapper = factory()

			const link = wrapper.find('[data-test="campaigns-stats-ctr-link"]')
			expect(link.exists()).toBe(true)
			expect(link.attributes('target')).toBe('_blank')
			expect(link.text()).toContain('campaigns.advice.ctr.link')
		})
	})

	describe('Actions section', () => {
		it('displays actions section for ACTIONS payout type', () => {
			const wrapper = factory({
				payableType: PayoutType.ACTIONS,
				actions: 100,
			})

			expect(wrapper.find('[data-test="campaigns-stats-total-actions"]').exists()).toBe(true)
			expect(wrapper.find('[data-test="campaigns-stats-total-actions"]').text()).toBe('100')
			expect(wrapper.text()).toContain('campaignSidebar.deliveredActions')
		})

		it('does not display actions section for IMPRESSIONS payout type', () => {
			const wrapper = factory({
				payableType: PayoutType.IMPRESSIONS,
			})

			expect(wrapper.find('[data-test="campaigns-stats-total-actions"]').exists()).toBe(false)
		})
	})

	describe('Impressions section', () => {
		it('displays impressions section for IMPRESSIONS payout type', () => {
			const wrapper = factory({
				payableType: PayoutType.IMPRESSIONS,
				impressions: 1000,
			})

			expect(wrapper.find('[data-test="campaigns-stats-total-impressions"]').exists()).toBe(true)
			expect(wrapper.find('[data-test="campaigns-stats-total-impressions"]').text()).toBe('1000')
			expect(wrapper.text()).toContain('campaignSidebar.deliveredImpressions')
		})

		it('does not display impressions section for ACTIONS payout type', () => {
			const wrapper = factory({
				payableType: PayoutType.ACTIONS,
			})

			expect(wrapper.find('[data-test="campaigns-stats-total-impressions"]').exists()).toBe(false)
		})
	})

	describe('Clicks section', () => {
		it('displays formatted clicks count', () => {
			const wrapper = factory({
				clicks: 500,
				payableType: PayoutType.ACTIONS,
			})

			expect(wrapper.find('[data-test="campaigns-stats-total-clicks"]').text()).toBe('500')
		})

		it('displays clicks label', () => {
			const wrapper = factory()

			expect(wrapper.text()).toContain('campaignSidebar.clicks')
		})
	})
})
