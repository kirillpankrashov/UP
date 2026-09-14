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

describe('Streamer Campaigns AdsetInfo Stats BrandAwareness', () => {
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
	})
})
