import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { brandAwarenessAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetInfo/fixtures/brandAwarenessAdsetInfo'

import CPA from '../CPA.vue'

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

describe('Streamer Campaigns AdsetInfo Stats BrandAwareness CPA', () => {
	const factory = (props = {}) => {
		return mount(CPA, {
			global: {
				plugins: [i18n],
			},
			props: {
				adset: {
					...brandAwarenessAdsetInfo,
					...props,
				},
				containerClass: 'test-class',
			},
		})
	}

	describe('Revenue section', () => {
		it('displays formatted current income', () => {
			const wrapper = factory({
				income: {
					current: 1000,
				},
			})

			const revenue = wrapper.find('[data-test="campaigns-stats-total-revenue"]')
			expect(revenue.text()).toBe('1000 USD')
		})

		it('displays total revenue label', () => {
			const wrapper = factory()

			expect(wrapper.text()).toContain('campaignSidebar.totalRevenue')
		})

		it('contains link to calculation explanation', () => {
			const wrapper = factory()

			const link = wrapper.find('a[href="links.howIsItCalculated"]')
			expect(link.attributes('target')).toBe('_blank')
			expect(link.text()).toBe('campaigns.advice.potentialIncome.link')
		})
	})

	describe('EVR section', () => {
		it('displays EVR level text and applies correct class for excellent level', () => {
			const wrapper = factory({
				evr: {
					list: [{ primary: true, value: 100 }],
					target: 100,
					global: 100,
				},
			})

			const evrText = wrapper.find('[data-test="campaigns-stats-evr"]')
			expect(evrText.text()).toBe('campaignSidebar.scale.excellent')
			expect(evrText.classes()).toContain('text-success')
		})

		it('displays EVR level text and applies correct class for very good level', () => {
			const wrapper = factory({
				evr: {
					list: [{ primary: true, value: 85 }],
					target: 100,
					global: 100,
				},
			})

			const evrText = wrapper.find('[data-test="campaigns-stats-evr"]')
			expect(evrText.text()).toBe('campaignSidebar.scale.veryGood')
			expect(evrText.classes()).toContain('text-success')
		})

		it('displays EVR level text and applies correct class for good level', () => {
			const wrapper = factory({
				evr: {
					list: [{ primary: true, value: 60 }],
					target: 100,
					global: 100,
				},
			})

			const evrText = wrapper.find('[data-test="campaigns-stats-evr"]')
			expect(evrText.text()).toBe('campaignSidebar.scale.good')
			expect(evrText.classes()).toContain('text-warning')
		})

		it('displays EVR level text and applies correct class for fair level', () => {
			const wrapper = factory({
				evr: {
					list: [{ primary: true, value: 30 }],
					target: 100,
					global: 100,
				},
			})

			const evrText = wrapper.find('[data-test="campaigns-stats-evr"]')
			expect(evrText.text()).toBe('campaignSidebar.scale.fair')
			expect(evrText.classes()).toContain('text-danger')
		})

		it('displays EVR level text and applies correct class for poor level', () => {
			const wrapper = factory({
				evr: {
					list: [{ primary: true, value: 10 }],
					target: 100,
					global: 100,
				},
			})

			const evrText = wrapper.find('[data-test="campaigns-stats-evr"]')
			expect(evrText.text()).toBe('campaignSidebar.scale.poor')
			expect(evrText.classes()).toContain('text-danger')
		})

		it('displays dash when EVR values are null', () => {
			const wrapper = factory({
				evr: {
					list: [{ primary: true, value: null }],
					target: null,
					global: null,
				},
			})

			const evrText = wrapper.find('[data-test="campaigns-stats-evr"]')
			expect(evrText.text()).toBe('–')
		})

		it('contains link to EVR improvement guide', () => {
			const wrapper = factory()

			const link = wrapper.find('a[href^="http"][target="_blank"]')
			expect(link.exists()).toBe(true)
			expect(link.text()).toBe('campaignSidebar.howToIncreaseEvr')
		})
	})

	describe('Actions section', () => {
		it('displays formatted current daily actions', () => {
			const wrapper = factory({
				dailyActionLimit: {
					current: 1000,
				},
			})

			const actions = wrapper.find('[data-test="campaigns-stats-delivered-daily-actions"]')
			expect(actions.text()).toBe('1000')
		})

		it('displays zero when current daily actions is null', () => {
			const wrapper = factory({
				dailyActionLimit: {
					current: null,
				},
			})

			const actions = wrapper.find('[data-test="campaigns-stats-delivered-daily-actions"]')
			expect(actions.text()).toBe('0')
		})

		it('displays delivered daily actions label', () => {
			const wrapper = factory()

			expect(wrapper.text()).toContain('campaignSidebar.deliveredDailyActions')
		})
	})

	it('applies container class from props', () => {
		const wrapper = factory()

		expect(wrapper.find('[data-name="campaigns-stats-brand-awareness-cpa"]').classes()).toContain('test-class')
	})
})
