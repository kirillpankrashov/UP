import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { CampaignType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { adsetInfo } from '@/modules/Partner/views/Agency/api/getAdsetInfo/fixtures/adsetInfo'

import Creative from '../Creative.vue'

describe('Partner Agency AdsetInfo Creative', () => {
	const factory = (props: any = {}) => {
		return mount(Creative, {
			global: {
				plugins: [i18n],
				stubs: {
					BrandAwareness: true,
					Performance: true,
				},
			},
			props: {
				adset: {
					...adsetInfo,
					...props,
				},
			},
		})
	}

	describe('Component rendering', () => {
		it('renders BrandAwareness for BRAND_AWARENESS campaign type', () => {
			const wrapper = factory({
				campaignType: CampaignType.BRAND_AWARENESS,
			})

			expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(false)
		})

		it('renders Performance for PERFORMANCE campaign type', () => {
			const wrapper = factory({
				...adsetInfo,
				campaignType: CampaignType.PERFORMANCE,
			})

			expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
		})

		it('renders nothing for unknown campaign type', () => {
			const wrapper = factory({
				campaignType: 'UNKNOWN' as CampaignType,
			})

			expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(false)
		})
	})

	describe('Props passing', () => {
		it('passes adset prop to BrandAwareness component', () => {
			const adset = {
				...adsetInfo,
				campaignType: CampaignType.BRAND_AWARENESS,
			}
			const wrapper = factory(adset)

			const component = wrapper.findComponent({ name: 'BrandAwareness' })
			expect(component.props('adset')).toMatchObject(adset)
		})

		it('passes adset prop to Performance component', () => {
			const adset = {
				...adsetInfo,
				campaignType: CampaignType.PERFORMANCE,
			}
			const wrapper = factory(adset)

			const component = wrapper.findComponent({ name: 'Performance' })
			expect(component.props('adset')).toMatchObject(adset)
		})

		it('updates rendered component when campaign type changes', async () => {
			const wrapper = factory({
				campaignType: CampaignType.BRAND_AWARENESS,
			})

			expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(true)

			await wrapper.setProps({
				adset: {
					...adsetInfo,
					campaignType: CampaignType.PERFORMANCE,
				},
			})

			await nextTick()
			expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(true)
		})
	})
})

