import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { AdFormat } from '@/core/types'
import { i18n } from '@/core/i18n'
import { brandAwarenessAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetInfo/fixtures/brandAwarenessAdsetInfo'

import PPV from '../PPV.vue'

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

describe('Streamer Campaigns AdsetInfo Stats BrandAwareness PPV', () => {
	const factory = (props = {}) => {
		return mount(PPV, {
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

	describe('CTR section', () => {
		it('displays current CTR with target CTR', () => {
			const wrapper = factory({
				ctr: {
					current: 2.5,
					target: 3.0,
					global: 2.0,
				},
			})

			expect(wrapper.find('[data-test="campaigns-stats-ctr"]').text()).toBe('2.5%')
			expect(wrapper.find('[data-test="campaigns-stats-ctr-target"]').text()).toContain('3%')
		})

		it('uses global CTR as target when target is null', () => {
			const wrapper = factory({
				ctr: {
					current: 2.5,
					target: null,
					global: 3.0,
				},
			})

			expect(wrapper.find('[data-test="campaigns-stats-ctr-target"]').text()).toContain('3%')
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

		it('contains link to CTR improvement guide', () => {
			const wrapper = factory()

			const link = wrapper.find('[data-test="campaigns-stats-ctr-link"]')
			expect(link.exists()).toBe(true)
			expect(link.attributes('target')).toBe('_blank')
			expect(link.text()).toContain('campaignSidebar.howToIncreaseCtr')
		})
	})

	describe('Impressions section', () => {
		it('displays formatted total impressions for non-SSP format', () => {
			const wrapper = factory({
				format: { id: 1 },
				impressions: {
					total: 1000,
				},
			})

			expect(wrapper.find('[data-test="campaigns-stats-total-impressions"]').text()).toBe('1000')
			expect(wrapper.text()).not.toContain('∞')
		})

		it('displays formatted total impressions with infinity symbol for SSP format', () => {
			const wrapper = factory({
				format: { id: AdFormat.YANDEX_FS },
				impressions: {
					total: 1000,
				},
			})

			expect(wrapper.find('[data-test="campaigns-stats-total-impressions"]').text()).toBe('1000')
			expect(wrapper.text()).toContain('∞')
		})

		it('displays formatted total impressions with infinity symbol for CPMSTAR_BANNER format', () => {
			const wrapper = factory({
				format: { id: AdFormat.CPMSTAR_BANNER },
				impressions: {
					total: 1000,
				},
			})

			expect(wrapper.find('[data-test="campaigns-stats-total-impressions"]').text()).toBe('1000')
			expect(wrapper.text()).toContain('∞')
		})

		it('displays impressions label', () => {
			const wrapper = factory()

			expect(wrapper.text()).toContain('campaignSidebar.deliveredImpressions')
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
