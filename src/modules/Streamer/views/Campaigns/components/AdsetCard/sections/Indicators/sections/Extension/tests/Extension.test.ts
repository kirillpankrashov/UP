import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { extensionAdset } from '@/modules/Streamer/views/Campaigns/api/getExtensionAdsets/fixtures/extensionAdset'

import Extension from '../Extension.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useCurrency: () => ({
		formatNumber: (value: number) => value.toString(),
	}),
}))

describe('Extension Component', () => {
	const factory = (props = {}) => {
		return mount(Extension, {
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

	describe('Impressions section', () => {
		it('displays daily impressions', () => {
			const wrapper = factory({
				impressions: 1000,
			})

			expect(wrapper.text()).toContain('campaignRow.dailyImpressions')
			expect(wrapper.text()).toContain('1000')
		})
	})

	describe('End date section', () => {
		it('displays end date', () => {
			const wrapper = factory({
				dates: {
					end: '2024-12-31',
				},
			})

			expect(wrapper.text()).toContain('campaignRow.dateEnd')
			expect(wrapper.text()).toContain('2024-12-31')
		})

		it('updates end date when adset prop changes', async () => {
			const wrapper = factory({
				dates: {
					end: '2024-12-31',
				},
			})

			await wrapper.setProps({
				adset: {
					...extensionAdset,
					dates: {
						start: '2024-12-31',
						end: '2025-01-01',
					},
				},
			})

			expect(wrapper.text()).toContain('2025-01-01')
		})
	})
})
