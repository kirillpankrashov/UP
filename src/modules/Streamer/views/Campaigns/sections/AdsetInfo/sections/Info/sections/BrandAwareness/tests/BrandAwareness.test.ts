import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { StrategyPayment } from '@/core/types'
import { i18n } from '@/core/i18n'
import { brandAwarenessAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetInfo/fixtures/brandAwarenessAdsetInfo'

import BrandAwareness from '../BrandAwareness.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetInfo Info BrandAwareness', () => {
	const factory = (props = {}) => {
		return mount(BrandAwareness, {
			global: {
				plugins: [i18n],
				stubs: {
					CPA: true,
					CPC: true,
					PPV: true,
					PPVA: true,
				},
			},
			props: {
				adset: {
					...brandAwarenessAdsetInfo,
					...props,
				},
			},
		})
	}

	describe('Strategy component rendering', () => {
		it('renders CPA component for CPA strategy', () => {
			const wrapper = factory({
				strategyPayment: {
					slug: StrategyPayment.CPA,
				},
			})

			expect(wrapper.findComponent({ name: 'CPA' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'CPC' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'PPV' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'PPVA' }).exists()).toBe(false)
		})

		it('renders CPC component for CPC strategy', () => {
			const wrapper = factory({
				strategyPayment: {
					slug: StrategyPayment.CPC,
				},
			})

			expect(wrapper.findComponent({ name: 'CPC' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'CPA' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'PPV' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'PPVA' }).exists()).toBe(false)
		})

		it('renders PPV component for PPV strategy', () => {
			const wrapper = factory({
				strategyPayment: {
					slug: StrategyPayment.PPV,
				},
			})

			expect(wrapper.findComponent({ name: 'PPV' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'CPA' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'CPC' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'PPVA' }).exists()).toBe(false)
		})

		it('renders PPVA component for PPVA strategy', () => {
			const wrapper = factory({
				strategyPayment: {
					slug: StrategyPayment.PPVA,
				},
			})

			expect(wrapper.findComponent({ name: 'PPVA' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'CPA' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'CPC' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'PPV' }).exists()).toBe(false)
		})

		it('renders nothing for unknown strategy', () => {
			const wrapper = factory({
				strategyPayment: {
					slug: 'UNKNOWN' as StrategyPayment,
				},
			})

			expect(wrapper.findComponent({ name: 'CPA' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'CPC' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'PPV' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'PPVA' }).exists()).toBe(false)
		})
	})

	describe('Props passing', () => {
		it('passes adset prop to strategy component', () => {
			const adset = {
				...brandAwarenessAdsetInfo,
				strategyPayment: {
					slug: StrategyPayment.CPA,
				},
			}
			const wrapper = factory(adset)

			const component = wrapper.findComponent({ name: 'CPA' })
			expect(component.props('adset')).toMatchObject(adset)
		})
	})

	describe('Dynamic component updates', () => {
		it('updates rendered component when strategy changes', async () => {
			const wrapper = factory({
				strategyPayment: {
					slug: StrategyPayment.CPA,
				},
			})

			expect(wrapper.findComponent({ name: 'CPA' }).exists()).toBe(true)

			await wrapper.setProps({
				adset: {
					...brandAwarenessAdsetInfo,
					strategyPayment: {
						title: 'CPC',
						slug: StrategyPayment.CPC,
					},
				},
			})

			expect(wrapper.findComponent({ name: 'CPA' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'CPC' }).exists()).toBe(true)
		})
	})
})
