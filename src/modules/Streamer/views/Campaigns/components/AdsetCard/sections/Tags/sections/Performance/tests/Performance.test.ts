import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { performanceAdset } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsets/fixtures/performanceAdset'

import Performance from '../Performance.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetCard Tags Performance', () => {
	const factory = (props = {}) => {
		return mount(Performance, {
			global: {
				plugins: [i18n],
				stubs: {
					Format: true,
					DailyLimit: true,
					ExtensionSetup: true,
					ExtensionCheck: true,
					ReportBtn: true,
					BlockLowCtr: true,
					BlockModerator: true,
				},
			},
			props: {
				adset: {
					...performanceAdset,
					...props,
				},
			},
		})
	}

	it('does not render for closed adset', async () => {
		const wrapper = factory({
			status: 'close',
		})

		await nextTick()

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-performance"]').exists()).toBe(false)
	})

	it('renders all components for active adset', async () => {
		const wrapper = factory({
			status: 'active',
		})

		await nextTick()

		expect(wrapper.findComponent({ name: 'Format' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'DailyLimit' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'ExtensionSetup' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'ExtensionCheck' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'ReportBtn' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'BlockLowCtr' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'BlockModerator' }).exists()).toBe(true)
	})

	it('passes correct props to child components', async () => {
		const wrapper = factory({
			status: 'active',
		})

		await nextTick()

		const childComponents = [
			'Format',
			'DailyLimit',
			'ExtensionSetup',
			'ExtensionCheck',
			'BlockLowCtr',
			'BlockModerator',
		]

		childComponents.forEach(component => {
			const child = wrapper.findComponent({ name: component })
			expect(child.props('adset')).toEqual(expect.objectContaining({
				...performanceAdset,
				status: 'active',
			}))
		})

		const reportBtn = wrapper.findComponent({ name: 'ReportBtn' })
		expect(reportBtn.props()).toEqual(expect.objectContaining({
			adset: expect.objectContaining({
				...performanceAdset,
				status: 'active',
			}),
			isSmall: true,
		}))
	})

	it('updates visibility when adset status changes', async () => {
		const wrapper = factory({
			status: 'active',
		})

		await nextTick()
		expect(wrapper.find('[data-name="campaigns-adset-card-tags-performance"]').exists()).toBe(true)

		await wrapper.setProps({
			adset: {
				...performanceAdset,
				status: 'close',
			},
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-performance"]').exists()).toBe(false)
	})
})
