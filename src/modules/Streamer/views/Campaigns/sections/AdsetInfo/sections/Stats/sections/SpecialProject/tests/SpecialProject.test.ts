import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { specialProjectAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getSpecialProjectAdsetInfo/fixtures/specialProjectAdsetInfo'

import SpecialProject from '../SpecialProject.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useCurrency: () => ({
		formatNumber: (value: number) => value.toString(),
	}),
}))

describe('Streamer Campaigns AdsetInfo Stats SpecialProject', () => {
	const factory = (props = {}) => {
		return mount(SpecialProject, {
			global: {
				plugins: [i18n],
			},
			props: {
				adset: {
					...specialProjectAdsetInfo,
					...props,
				},
			},
		})
	}

	describe('Impressions section', () => {
		it('displays formatted impressions count', () => {
			const wrapper = factory({ impressions: 12345 })

			expect(wrapper.find('[data-test="campaigns-stats-total-impressions"]').text()).toBe('12345')
		})

		it('displays zero when impressions is 0', () => {
			const wrapper = factory({ impressions: 0 })

			expect(wrapper.find('[data-test="campaigns-stats-total-impressions"]').text()).toBe('0')
		})

		it('displays impressions label', () => {
			const wrapper = factory()

			expect(wrapper.text()).toContain('campaignSidebar.deliveredImpressions')
		})
	})

	describe('Clicks section', () => {
		it('displays formatted clicks count', () => {
			const wrapper = factory({ clicks: 567 })

			expect(wrapper.find('[data-test="campaigns-stats-total-clicks"]').text()).toBe('567')
		})

		it('displays zero when clicks is 0', () => {
			const wrapper = factory({ clicks: 0 })

			expect(wrapper.find('[data-test="campaigns-stats-total-clicks"]').text()).toBe('0')
		})

		it('displays clicks label', () => {
			const wrapper = factory()

			expect(wrapper.text()).toContain('campaignSidebar.clicks')
		})
	})
})
