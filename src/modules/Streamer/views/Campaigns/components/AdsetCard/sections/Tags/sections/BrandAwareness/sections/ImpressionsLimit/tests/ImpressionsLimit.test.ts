import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'

import ImpressionsLimit from '../ImpressionsLimit.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetCard Tags BrandAwareness ImpressionsLimit', () => {
	const factory = (props = {}) => {
		return mount(ImpressionsLimit, {
			global: {
				plugins: [i18n],
			},
			props: {
				adset: {
					...brandAwarenessCustomAdset,
					...props,
				},
			},
		})
	}

	it('does not render when current impressions are less than daily limit', () => {
		const wrapper = factory({
			impressions: {
				current: 50,
				dailyLimit: 100,
			},
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.exists()).toBe(false)
	})

	it('renders when current impressions equal daily limit', () => {
		const wrapper = factory({
			impressions: {
				current: 100,
				dailyLimit: 100,
			},
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.exists()).toBe(true)
		expect(wrapper.text()).toContain('campaignRow.tags.dailyLimitDepleted')
	})

	it('renders when current impressions exceed daily limit', () => {
		const wrapper = factory({
			impressions: {
				current: 150,
				dailyLimit: 100,
			},
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.exists()).toBe(true)
		expect(wrapper.text()).toContain('campaignRow.tags.dailyLimitDepleted')
	})

	it('passes correct props to ElTag', () => {
		const wrapper = factory({
			impressions: {
				current: 100,
				dailyLimit: 100,
			},
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.props()).toEqual(expect.objectContaining({
			size: 'small',
			type: 'warning',
			round: true,
		}))
	})

	it('updates visibility when impressions change', async () => {
		const wrapper = factory({
			impressions: {
				current: 50,
				dailyLimit: 100,
			},
		})

		expect(wrapper.findComponent({ name: 'ElTag' }).exists()).toBe(false)

		await wrapper.setProps({
			adset: {
				...brandAwarenessCustomAdset,
				impressions: {
					current: 100,
					dailyLimit: 100,
					dailyLimitRest: 0,
				},
			},
		})

		expect(wrapper.findComponent({ name: 'ElTag' }).exists()).toBe(true)
	})
})
