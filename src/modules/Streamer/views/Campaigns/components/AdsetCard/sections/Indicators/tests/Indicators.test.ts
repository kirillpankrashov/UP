import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { performanceAdset } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsets/fixtures/performanceAdset'
import { prerollAdset } from '@/modules/Streamer/views/Campaigns/api/getPrerollAdsets/fixtures/prerollAdset'

import Indicators from '../Indicators.vue'
import { BrandAwareness, Performance, Preroll } from '../sections'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Indicators Component', () => {
	const factory = (props = {}) => {
		return mount(Indicators, {
			global: {
				plugins: [i18n],
				stubs: {
					BrandAwareness: true,
					Performance: true,
					Preroll: true,
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

	describe('Closed campaign', () => {
		it('displays only end date for closed campaign', () => {
			const wrapper = factory({
				status: 'close',
				dates: {
					end: '2024-12-31',
				},
			})

			expect(wrapper.text()).toContain('campaignRow.dateEnd')
			expect(wrapper.text()).toContain('2024-12-31')
			expect(wrapper.findComponent(BrandAwareness).exists()).toBe(false)
			expect(wrapper.findComponent(Performance).exists()).toBe(false)
			expect(wrapper.findComponent(Preroll).exists()).toBe(false)
		})

		it('updates end date when adset prop changes', async () => {
			const wrapper = factory({
				status: 'close',
				dates: {
					end: '2024-12-31',
				},
			})

			await wrapper.setProps({
				adset: {
					...brandAwarenessCustomAdset,
					status: 'close',
					dates: {
						start: '2024-12-31',
						end: '2025-01-01',
					},
				},
			})

			expect(wrapper.text()).toContain('2025-01-01')
		})
	})

	describe('Active campaign indicators', () => {
		it('renders BrandAwareness component for BRAND_AWARENESS campaign type', () => {
			const wrapper = factory({
				campaignType: CampaignType.BRAND_AWARENESS,
				status: 'active',
			})

			expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(true)
		})

		it('renders Performance component for PERFORMANCE campaign type', () => {
			const wrapper = factory({
				...performanceAdset,
				campaignType: CampaignType.PERFORMANCE,
				status: 'active',
			})

			expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(true)
		})

		it('renders Preroll component for PREROLL campaign type', () => {
			const wrapper = factory({
				...prerollAdset,
				campaignType: CampaignType.PREROLL,
				status: 'active',
			})

			expect(wrapper.findComponent({ name: 'Preroll' }).exists()).toBe(true)
		})

		it('passes adset prop to campaign type component', () => {
			const wrapper = factory({
				campaignType: CampaignType.BRAND_AWARENESS,
				status: 'active',
			})

			const brandAwareness = wrapper.findComponent({ name: 'BrandAwareness' })
			expect(brandAwareness.props('adset')).toEqual(expect.objectContaining({
				campaignType: CampaignType.BRAND_AWARENESS,
				status: 'active',
			}))
		})

		it('renders nothing for unknown campaign type', () => {
			const wrapper = factory({
				campaignType: 'UNKNOWN' as CampaignType,
				status: 'active',
			})

			expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Preroll' }).exists()).toBe(false)
		})
	})
})
