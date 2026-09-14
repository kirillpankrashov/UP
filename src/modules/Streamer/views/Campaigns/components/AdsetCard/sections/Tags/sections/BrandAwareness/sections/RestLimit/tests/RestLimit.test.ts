import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { REST_LIMIT_PERCENT } from '@/core/consts'
import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'

import RestLimit from '../RestLimit.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('RestLimit Component', () => {
	const factory = (props = {}) => {
		return mount(RestLimit, {
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

	it('does not render when rest limit percent is above threshold', () => {
		const wrapper = factory({
			restLimitPercent: REST_LIMIT_PERCENT + 1,
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.exists()).toBe(false)
	})

	it('renders when rest limit percent equals threshold', () => {
		const wrapper = factory({
			restLimitPercent: REST_LIMIT_PERCENT,
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.exists()).toBe(true)
		expect(wrapper.text()).toContain('campaignRow.tags.totalLimitDepleted')
	})

	it('renders when rest limit percent is below threshold', () => {
		const wrapper = factory({
			restLimitPercent: REST_LIMIT_PERCENT - 1,
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.exists()).toBe(true)
		expect(wrapper.text()).toContain('campaignRow.tags.totalLimitDepleted')
	})

	it('passes correct props to ElTag', () => {
		const wrapper = factory({
			restLimitPercent: REST_LIMIT_PERCENT,
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.props()).toEqual(expect.objectContaining({
			size: 'small',
			type: 'danger',
			round: true,
		}))
	})

	it('updates visibility when rest limit percent changes', async () => {
		const wrapper = factory({
			restLimitPercent: REST_LIMIT_PERCENT + 1,
		})

		expect(wrapper.findComponent({ name: 'ElTag' }).exists()).toBe(false)

		await wrapper.setProps({
			adset: {
				...brandAwarenessCustomAdset,
				restLimitPercent: REST_LIMIT_PERCENT,
			},
		})

		expect(wrapper.findComponent({ name: 'ElTag' }).exists()).toBe(true)
	})
})
