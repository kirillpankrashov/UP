import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { StrategyPayment } from '@/core/types'
import { i18n } from '@/core/i18n'
import { QuestionTooltip } from '@/components'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'

import DailyActionsLimit from '../DailyActionsLimit.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useCurrency: () => ({
		formatNumber: (value: number) => value.toString(),
	}),
}))

describe('Streamer Campaigns AdsetCard Indicators BrandAwareness DailyActionsLimit', () => {
	const factory = (props = {}) => {
		return mount(DailyActionsLimit, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
			},
			props: {
				adset: {
					...brandAwarenessCustomAdset,
					...props,
				},
			},
		})
	}

	it('renders daily actions limit for PPVA strategy', async () => {
		const wrapper = factory({
			strategyPayment: StrategyPayment.PPVA,
			dailyActionLimit: {
				today: 10,
				limit: 100,
				enabled: true,
			},
		})

		await nextTick()

		expect(wrapper.text()).toContain('10')
		expect(wrapper.text()).toContain('100')
		expect(wrapper.text()).toContain('campaignRow.of')
	})

	it('renders impressions limit for CPA strategy', async () => {
		const wrapper = factory({
			strategyPayment: StrategyPayment.CPA,
			impressions: {
				dailyLimitRest: 20,
				dailyLimit: 200,
				current: 0,
			},
		})

		await nextTick()

		expect(wrapper.text()).toContain('20')
		expect(wrapper.text()).toContain('200')
	})

	it('renders impressions limit for CPC strategy', async () => {
		const wrapper = factory({
			strategyPayment: StrategyPayment.CPC,
			impressions: {
				dailyLimitRest: 30,
				dailyLimit: 300,
				current: 0,
			},
		})

		await nextTick()

		expect(wrapper.text()).toContain('30')
		expect(wrapper.text()).toContain('300')
		expect(wrapper.text()).toContain('campaignRow.of')
	})

	it('contains QuestionTooltip component', () => {
		const wrapper = factory({
			strategyPayment: StrategyPayment.PPVA,
			dailyActionLimit: {
				today: 10,
				limit: 100,
				enabled: true,
			},
		})

		expect(wrapper.findComponent(QuestionTooltip).exists()).toBe(true)
	})
})
