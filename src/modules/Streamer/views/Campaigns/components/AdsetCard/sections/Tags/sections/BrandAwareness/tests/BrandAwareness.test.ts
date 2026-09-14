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

describe('Streamer Campaigns AdsetCard Tags BrandAwareness', () => {
	const factory = (props = {}) => {
		return mount(BrandAwareness, {
			global: {
				plugins: [i18n],
				stubs: {
					Format: true,
					ImpressionsLimit: true,
					DailyActions: true,
					DailyActionsLimit: true,
					RestLimit: true,
					ReportBtn: true,
					BlockLowCtr: true,
					BlockModerator: true,
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

	it('does not render for closed adset', () => {
		const wrapper = factory({
			status: 'close',
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-brand-awareness"]').exists()).toBe(false)
	})

	it('renders all tag components for active adset', () => {
		const wrapper = factory({
			status: 'active',
		})

		expect(wrapper.findComponent({ name: 'Format' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'ImpressionsLimit' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'DailyActions' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'DailyActionsLimit' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'RestLimit' }).exists()).toBe(true)
	})

	it('renders report button', () => {
		const wrapper = factory({
			status: 'active',
		})

		const reportBtn = wrapper.findComponent({ name: 'ReportBtn' })
		expect(reportBtn.exists()).toBe(true)
		expect(reportBtn.props()).toEqual(expect.objectContaining({
			adset: expect.objectContaining(brandAwarenessCustomAdset),
			isSmall: true,
		}))
	})

	it('renders block components', () => {
		const wrapper = factory({
			status: 'active',
		})

		expect(wrapper.findComponent({ name: 'BlockLowCtr' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'BlockModerator' }).exists()).toBe(true)
	})

	it('passes correct props to child components', () => {
		const wrapper = factory({
			status: 'active',
		})

		const childComponents = [
			'Format',
			'ImpressionsLimit',
			'DailyActions',
			'DailyActionsLimit',
			'RestLimit',
			'BlockLowCtr',
			'BlockModerator',
		]

		childComponents.forEach(component => {
			const child = wrapper.findComponent({ name: component })
			expect(child.props('adset')).toEqual(expect.objectContaining({
				...brandAwarenessCustomAdset,
				status: 'active',
			}))
		})
	})

	it('updates visibility when adset status changes', async () => {
		const wrapper = factory({
			status: 'active',
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-brand-awareness"]').exists()).toBe(true)

		await wrapper.setProps({
			adset: {
				...brandAwarenessCustomAdset,
				status: 'close',
			},
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-brand-awareness"]').exists()).toBe(false)
	})
})
