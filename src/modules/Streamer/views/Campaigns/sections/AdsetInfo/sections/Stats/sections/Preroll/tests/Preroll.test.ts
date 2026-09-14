import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { PayoutType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { prerollAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getPrerollAdsetInfo/fixtures/prerollAdsetInfo'

import Preroll from '../Preroll.vue'

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

describe('Streamer Campaigns AdsetInfo Stats Preroll', () => {
	const factory = (props = {}) => {
		return mount(Preroll, {
			global: {
				plugins: [i18n],
			},
			props: {
				adset: {
					...prerollAdsetInfo,
					...props,
				},
			},
		})
	}

	describe('Revenue section', () => {
		it('displays formatted current and estimated revenue', () => {
			const wrapper = factory({
				income: {
					current: 1000,
					estimate: 2000,
				},
			})

			expect(wrapper.find('[data-test="campaigns-stats-total-revenue"]').text()).toBe('1000 USD')
			expect(wrapper.find('[data-test="campaigns-stats-estimated-revenue"]').text()).toContain('2000 USD')
		})

		it('displays revenue labels', () => {
			const wrapper = factory()

			expect(wrapper.text()).toContain('campaignSidebar.revenue')
			expect(wrapper.text()).toContain('campaignSidebar.estimatedRevenue')
		})
	})

	describe('CTR section', () => {
		it('displays current CTR with success class when above target', () => {
			const wrapper = factory({
				ctr: {
					current: 3.5,
					target: 3.0,
					global: 2.0,
				},
			})

			const ctrElement = wrapper.find('[data-test="campaigns-stats-ctr"]')
			expect(ctrElement.text()).toBe('3.5%')
			expect(ctrElement.classes()).toContain('text-success')
		})

		it('displays current CTR with danger class when below target', () => {
			const wrapper = factory({
				ctr: {
					current: 2.5,
					target: 3.0,
					global: 2.0,
				},
			})

			const ctrElement = wrapper.find('[data-test="campaigns-stats-ctr"]')
			expect(ctrElement.text()).toBe('2.5%')
			expect(ctrElement.classes()).toContain('text-danger')
		})

		it('uses global CTR as target when target is null', () => {
			const wrapper = factory({
				ctr: {
					current: 1.5,
					target: null,
					global: 2.0,
				},
			})

			const ctrElement = wrapper.find('[data-test="campaigns-stats-ctr"]')
			expect(ctrElement.classes()).toContain('text-danger')
		})

		it('displays CTR label', () => {
			const wrapper = factory()

			expect(wrapper.text()).toContain('campaignSidebar.ctr')
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
			expect(wrapper.text()).toContain('campaignSidebar.deliveredAtions')
			expect(wrapper.text()).toContain('∞')
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
			expect(wrapper.text()).toContain('∞')
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
			})

			expect(wrapper.find('[data-test="campaigns-stats-total-clicks"]').text()).toBe('500')
		})

		it('displays clicks label', () => {
			const wrapper = factory()

			expect(wrapper.text()).toContain('campaignSidebar.clicks')
		})
	})
})
