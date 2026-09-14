import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { AdFormat, StrategyPayment } from '@/core/types'
import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { yandexFsAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/yandexFsAdset'

import DailyLimit from '../DailyLimit.vue'

vi.mock('@/core/helpers')
// vi.mock('@/core/helpers', () => ({
// 	isSspFormat: (formatId: number) => formatId === 2, // Мокаем для yandexFs формата
// }))

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useCurrency: () => ({
		formatNumber: (value: number) => value.toString(),
	}),
}))

describe('DailyLimit Component', () => {
	const factory = (props = {}) => {
		return mount(DailyLimit, {
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

	it('renders infinity limit for SSP format', async () => {
		const wrapper = mount(DailyLimit, {
			global: {
				plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
			},
			props: {
				adset: yandexFsAdset,
			},
		})

		await nextTick()

		expect(wrapper.text()).toContain('∞')
	})

	it('renders infinity limit for CPMSTAR_BANNER format', async () => {
		const wrapper = mount(DailyLimit, {
			global: {
				plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
			},
			props: {
				adset: {
					...brandAwarenessCustomAdset,
					format: {
						id: AdFormat.CPMSTAR_BANNER,
						title: 'CPMSTAR_BANNER',
						description: 'CPMSTAR_BANNER',
						icon: 'CPMSTAR_BANNER',
					},
				},
			},
		})

		await nextTick()

		expect(wrapper.text()).toContain('∞')
	})

	it('renders daily limit for CPC strategy', async () => {
		const wrapper = factory({
			strategyPayment: StrategyPayment.CPC,
			impressions: {
				dailyLimitRest: 20,
				dailyLimit: 200,
				current: 0,
			},
		})

		await nextTick()

		expect(wrapper.text()).toContain('20')
		expect(wrapper.text()).toContain('200')
		expect(wrapper.text()).toContain('campaignRow.of')
	})

	it('renders daily limit for PPV strategy', async () => {
		const wrapper = factory({
			strategyPayment: StrategyPayment.PPV,
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

	it('renders daily limit for PPVA strategy', async () => {
		const wrapper = factory({
			strategyPayment: StrategyPayment.PPVA,
			impressions: {
				dailyLimitRest: 40,
				dailyLimit: 400,
				current: 0,
			},
		})

		await nextTick()

		expect(wrapper.text()).toContain('40')
		expect(wrapper.text()).toContain('400')
		expect(wrapper.text()).toContain('campaignRow.of')
	})

	it('displays correct label', () => {
		const wrapper = factory({
			strategyPayment: StrategyPayment.PPVA,
			impressions: {
				dailyLimitRest: 40,
				dailyLimit: 400,
				current: 0,
			},
		})

		expect(wrapper.text()).toContain('campaignRow.dailyLimit')
	})
})
