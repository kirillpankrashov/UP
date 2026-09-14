import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { brandAwarenessAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetInfo/fixtures/brandAwarenessAdsetInfo'

import CPC from '../CPC.vue'

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

describe('Streamer Campaigns AdsetInfo Stats BrandAwareness CPC', () => {
	const factory = (props = {}) => {
		return mount(CPC, {
			global: {
				plugins: [i18n],
			},
			props: {
				adset: {
					...brandAwarenessAdsetInfo,
					...props,
				},
				containerClass: 'test-container-class',
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

		it('displays total revenue label', () => {
			const wrapper = factory()

			expect(wrapper.text()).toContain('campaignSidebar.totalRevenue')
		})

		it('contains link to revenue calculation explanation', () => {
			const wrapper = factory()

			const link = wrapper.find('[data-test="campaigns-stats-total-revenue-link"]')
			expect(link.exists()).toBe(true)
			expect(link.attributes('target')).toBe('_blank')
			expect(link.text()).toContain('campaigns.advice.potentialIncome.link')
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

	describe('Container styling', () => {
		it('applies container class from props', () => {
			const wrapper = factory()

			expect(wrapper.find('[data-name="campaigns-stats-brand-awareness-cpc"]').classes()).toContain('test-container-class')
		})
	})
})
