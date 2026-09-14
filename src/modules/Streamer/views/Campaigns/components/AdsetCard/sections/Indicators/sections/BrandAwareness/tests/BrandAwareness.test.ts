import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'

import BrandAwareness from '../BrandAwareness.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetCard Indicators BrandAwareness', () => {
	const factory = (props = {}) => {
		return mount(BrandAwareness, {
			global: {
				plugins: [i18n],
				stubs: {
					DailyLimit: true,
					DailyActionsLimit: true,
					Revenue: true,
					Time: true,
					StreamerDayLimit: true,
				},
			},
			props: {
				adset: {
					...brandAwarenessCustomAdset,
					...props,
				},
			},
		})
	}

	it('renders DailyLimit component with correct props', () => {
		const wrapper = factory()
		const dailyLimit = wrapper.findComponent({ name: 'DailyLimit' })

		expect(dailyLimit.exists()).toBe(true)
		expect(dailyLimit.props('adset')).toEqual(expect.objectContaining(brandAwarenessCustomAdset))
	})

	it('displays end date section', () => {
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
				...brandAwarenessCustomAdset,
				dates: {
					start: '2024-12-31',
					end: '2025-01-01',
				},
			},
		})

		expect(wrapper.text()).toContain('2025-01-01')
	})

	it('renders Time component', () => {
		const wrapper = factory()
		const timeComponent = wrapper.findComponent({ name: 'Time' })

		expect(timeComponent.exists()).toBe(true)
		expect(timeComponent.props('adset')).toEqual(expect.objectContaining(brandAwarenessCustomAdset))
	})

	it('renders StreamerDayLimit component', () => {
		const wrapper = factory()
		const streamerDayLimitComponent = wrapper.findComponent({ name: 'StreamerDayLimit' })

		expect(streamerDayLimitComponent.exists()).toBe(true)
		expect(streamerDayLimitComponent.props('adset')).toEqual(expect.objectContaining(brandAwarenessCustomAdset))
	})
})
