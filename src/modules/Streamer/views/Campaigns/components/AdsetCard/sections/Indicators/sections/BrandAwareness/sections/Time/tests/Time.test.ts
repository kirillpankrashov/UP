import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'

import Time from '../Time.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetCard Indicators BrandAwareness Time', () => {
	const factory = (props = {}) => {
		return mount(Time, {
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

	describe('Time display', () => {
		it('renders time when both start and end are provided', () => {
			const wrapper = factory({
				time: {
					start: '10:00:00',
					end: '22:00:00',
				},
			})

			expect(wrapper.find('[data-name="campaigns-adset-card-indicators-brand-awareness-time"]').exists()).toBe(true)
			expect(wrapper.text()).toContain('campaignRow.time')
			expect(wrapper.text()).toContain('10:00 - 22:00')
		})

		it('formats time correctly from HH:mm:ss to HH:mm', () => {
			const wrapper = factory({
				time: {
					start: '09:30:45',
					end: '18:45:30',
				},
			})

			expect(wrapper.text()).toContain('09:30 - 18:45')
		})

		it('does not render when start is null', () => {
			const wrapper = factory({
				time: {
					start: null,
					end: '22:00:00',
				},
			})

			expect(wrapper.find('[data-name="campaigns-adset-card-indicators-brand-awareness-time"]').exists()).toBe(false)
		})

		it('does not render when end is null', () => {
			const wrapper = factory({
				time: {
					start: '10:00:00',
					end: null,
				},
			})

			expect(wrapper.find('[data-name="campaigns-adset-card-indicators-brand-awareness-time"]').exists()).toBe(false)
		})

		it('does not render when both start and end are null', () => {
			const wrapper = factory({
				time: {
					start: null,
					end: null,
				},
			})

			expect(wrapper.find('[data-name="campaigns-adset-card-indicators-brand-awareness-time"]').exists()).toBe(false)
		})
	})
})

