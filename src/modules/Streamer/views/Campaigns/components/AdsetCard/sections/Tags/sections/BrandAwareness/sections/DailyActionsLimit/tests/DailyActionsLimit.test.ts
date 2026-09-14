import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'

import DailyActionsLimit from '../DailyActionsLimit.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('DailyActionsLimit Component', () => {
	const factory = (props = {}) => {
		return mount(DailyActionsLimit, {
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

	it('does not render when daily action limit is disabled', () => {
		const wrapper = factory({
			dailyActionLimit: {
				enabled: false,
				today: 100,
				limit: 100,
			},
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.exists()).toBe(false)
	})

	it('does not render when today value is 0', () => {
		const wrapper = factory({
			dailyActionLimit: {
				enabled: true,
				today: 0,
				limit: 100,
			},
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.exists()).toBe(false)
	})

	it('does not render when limit value is 0', () => {
		const wrapper = factory({
			dailyActionLimit: {
				enabled: true,
				today: 100,
				limit: 0,
			},
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.exists()).toBe(false)
	})

	it('does not render when today is less than limit', () => {
		const wrapper = factory({
			dailyActionLimit: {
				enabled: true,
				today: 50,
				limit: 100,
			},
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.exists()).toBe(false)
	})

	it('renders tag when limit is reached', () => {
		const wrapper = factory({
			dailyActionLimit: {
				enabled: true,
				today: 100,
				limit: 100,
			},
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.exists()).toBe(true)
		expect(wrapper.text()).toContain('campaignRow.tags.dailyActionsLimitDepleted')
	})

	it('renders tag when today exceeds limit', () => {
		const wrapper = factory({
			dailyActionLimit: {
				enabled: true,
				today: 150,
				limit: 100,
			},
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.exists()).toBe(true)
		expect(wrapper.text()).toContain('campaignRow.tags.dailyActionsLimitDepleted')
	})

	it('passes correct props to ElTag', () => {
		const wrapper = factory({
			dailyActionLimit: {
				enabled: true,
				today: 100,
				limit: 100,
			},
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.props()).toEqual(expect.objectContaining({
			size: 'small',
			type: 'danger',
			round: true,
		}))
	})

	it('updates visibility when daily action limit changes', async () => {
		const wrapper = factory({
			dailyActionLimit: {
				enabled: true,
				today: 50,
				limit: 100,
			},
		})

		expect(wrapper.findComponent({ name: 'ElTag' }).exists()).toBe(false)

		await wrapper.setProps({
			adset: {
				...brandAwarenessCustomAdset,
				dailyActionLimit: {
					enabled: true,
					today: 100,
					limit: 100,
				},
			},
		})

		expect(wrapper.findComponent({ name: 'ElTag' }).exists()).toBe(true)
	})
})
