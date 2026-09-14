import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { brandAwarenessAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetInfo/fixtures/brandAwarenessAdsetInfo'
import { extensionAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getExtensionAdsetInfo/fixtures/extensionAdsetInfo'
import { performanceAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsetInfo/fixtures/performanceAdsetInfo'
import { prerollAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getPrerollAdsetInfo/fixtures/prerollAdsetInfo'
import { specialProjectAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getSpecialProjectAdsetInfo/fixtures/specialProjectAdsetInfo'

import Info from '../Info.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetInfo Info', () => {
	const factory = (props = {}) => {
		return mount(Info, {
			global: {
				plugins: [i18n],
				stubs: {
					BrandAwareness: true,
					Extension: true,
					Performance: true,
					Preroll: true,
					SpecialProject: true,
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

	describe('Component rendering', () => {
		it('renders BrandAwareness component for BRAND_AWARENESS campaign type', () => {
			const wrapper = factory({
				campaignType: CampaignType.BRAND_AWARENESS,
			})

			expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Preroll' }).exists()).toBe(false)
		})

		it('renders Performance component for PERFORMANCE campaign type', () => {
			const wrapper = factory({
				...performanceAdsetInfo,
				campaignType: CampaignType.PERFORMANCE,
			})

			expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Preroll' }).exists()).toBe(false)
		})

		it('renders Preroll component for PREROLL campaign type', () => {
			const wrapper = factory({
				...prerollAdsetInfo,
				campaignType: CampaignType.PREROLL,
			})

			expect(wrapper.findComponent({ name: 'Preroll' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(false)
		})

		it('renders Extension component for EXTENSION campaign type', () => {
			const wrapper = factory({
				...extensionAdsetInfo,
				campaignType: CampaignType.EXTENSION,
			})

			expect(wrapper.findComponent({ name: 'Extension' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Preroll' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'SpecialProject' }).exists()).toBe(false)
		})

		it('renders SpecialProject component for SPECIAL_PROJECT campaign type', () => {
			const wrapper = factory({
				...specialProjectAdsetInfo,
				campaignType: CampaignType.SPECIAL_PROJECT,
			})

			expect(wrapper.findComponent({ name: 'SpecialProject' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Preroll' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Extension' }).exists()).toBe(false)
		})

		it('renders nothing for unknown campaign type', () => {
			const wrapper = factory({
				campaignType: 'UNKNOWN' as CampaignType,
			})

			expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Extension' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Preroll' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'SpecialProject' }).exists()).toBe(false)
		})
	})

	describe('Props passing', () => {
		it('passes adset prop to BrandAwareness component', () => {
			const adset = {
				...brandAwarenessAdsetInfo,
				campaignType: CampaignType.BRAND_AWARENESS,
			}
			const wrapper = factory(adset)

			const component = wrapper.findComponent({ name: 'BrandAwareness' })
			expect(component.props('adset')).toMatchObject(adset)
		})

		it('passes adset prop to Performance component', () => {
			const adset = {
				...performanceAdsetInfo,
				campaignType: CampaignType.PERFORMANCE,
			}
			const wrapper = factory(adset)

			const component = wrapper.findComponent({ name: 'Performance' })
			expect(component.props('adset')).toMatchObject(adset)
		})

		it('passes adset prop to Preroll component', () => {
			const adset = {
				...prerollAdsetInfo,
				campaignType: CampaignType.PREROLL,
			}
			const wrapper = factory(adset)

			const component = wrapper.findComponent({ name: 'Preroll' })
			expect(component.props('adset')).toMatchObject(adset)
		})

		it('passes adset prop to Extension component', () => {
			const adset = {
				...extensionAdsetInfo,
				campaignType: CampaignType.EXTENSION,
			}
			const wrapper = factory(adset)

			const component = wrapper.findComponent({ name: 'Extension' })
			expect(component.props('adset')).toMatchObject(adset)
		})

		it('passes adset prop to SpecialProject component', () => {
			const adset = {
				...specialProjectAdsetInfo,
				campaignType: CampaignType.SPECIAL_PROJECT,
			}
			const wrapper = factory(adset)

			const component = wrapper.findComponent({ name: 'SpecialProject' })
			expect(component.props('adset')).toMatchObject(adset)
		})
	})

	describe('Dynamic component updates', () => {
		it('updates rendered component when campaign type changes', async () => {
			const wrapper = factory({
				campaignType: CampaignType.BRAND_AWARENESS,
			})

			expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(true)

			await wrapper.setProps({
				adset: {
					...performanceAdsetInfo,
					campaignType: CampaignType.PERFORMANCE,
				},
			})

			expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(true)
		})
	})
})
