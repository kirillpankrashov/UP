import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { extensionAdset } from '@/modules/Streamer/views/Campaigns/api/getExtensionAdsets/fixtures/extensionAdset'

import DailyLimit from '../DailyLimit.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetCard Tags Performance DailyLimit', () => {
	const factory = (props = {}) => {
		return mount(DailyLimit, {
			global: {
				plugins: [i18n],
			},
			props: {
				adset: {
					...extensionAdset,
					...props,
				},
			},
		})
	}

	it('does not render when adsetReady and ready are false', () => {
		const wrapper = factory({
			adsetReady: false,
			ready: false,
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.exists()).toBe(false)
	})

	it('renders when adsetReady is true', () => {
		const wrapper = factory({
			adsetReady: true,
			ready: false,
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.exists()).toBe(true)
		expect(wrapper.text()).toContain('campaignRow.tags.performanceDailyDepleted')
	})

	it('renders when ready is true', () => {
		const wrapper = factory({
			adsetReady: false,
			ready: true,
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.exists()).toBe(true)
		expect(wrapper.text()).toContain('campaignRow.tags.performanceDailyDepleted')
	})

	it('passes correct props to ElTag', () => {
		const wrapper = factory({
			adsetReady: true,
		})

		const tag = wrapper.findComponent({ name: 'ElTag' })
		expect(tag.props()).toEqual(expect.objectContaining({
			size: 'small',
			type: 'danger',
		}))
	})

	it('updates visibility when ready status changes', async () => {
		const wrapper = factory({
			adsetReady: false,
			ready: false,
		})

		expect(wrapper.findComponent({ name: 'ElTag' }).exists()).toBe(false)

		await wrapper.setProps({
			adset: {
				...extensionAdset,
				adsetReady: true,
				ready: false,
			},
		})

		expect(wrapper.findComponent({ name: 'ElTag' }).exists()).toBe(true)
	})
})
