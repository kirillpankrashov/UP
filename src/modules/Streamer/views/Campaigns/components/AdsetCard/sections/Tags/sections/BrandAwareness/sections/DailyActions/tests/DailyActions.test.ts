import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'

import DailyActions from '../DailyActions.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetCard Tags BrandAwareness DailyActions', () => {
	const factory = (props = {}) => {
		return mount(DailyActions, {
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
				today: 10,
				limit: 100,
			},
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-brand-awareness-daily-actions"]').exists()).toBe(false)
	})

	it('does not render when today value is null', () => {
		const wrapper = factory({
			dailyActionLimit: {
				enabled: true,
				today: null,
				limit: 100,
			},
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-brand-awareness-daily-actions"]').exists()).toBe(false)
	})

	it('does not render when limit value is null', () => {
		const wrapper = factory({
			dailyActionLimit: {
				enabled: true,
				today: 10,
				limit: null,
			},
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-brand-awareness-daily-actions"]').exists()).toBe(false)
	})

	it('renders tag when all conditions are met', () => {
		const wrapper = factory({
			dailyActionLimit: {
				enabled: true,
				today: 10,
				limit: 100,
			},
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-brand-awareness-daily-actions"]').exists()).toBe(true)
		expect(wrapper.text()).toContain('campaignRow.tags.actionBonus')
	})

	it('updates visibility when daily action limit changes', async () => {
		const wrapper = factory({
			dailyActionLimit: {
				enabled: false,
				today: 10,
				limit: 100,
			},
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-brand-awareness-daily-actions"]').exists()).toBe(false)

		await wrapper.setProps({
			adset: {
				...brandAwarenessCustomAdset,
				dailyActionLimit: {
					enabled: true,
					today: 10,
					limit: 100,
				},
			},
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-brand-awareness-daily-actions"]').exists()).toBe(true)
	})

	it('passes correct props to ElTag', () => {
		const wrapper = factory({
			dailyActionLimit: {
				enabled: true,
				today: 10,
				limit: 100,
			},
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.props()).toEqual(expect.objectContaining({
			size: 'small',
			type: 'success',
			round: true,
		}))
	})
})
