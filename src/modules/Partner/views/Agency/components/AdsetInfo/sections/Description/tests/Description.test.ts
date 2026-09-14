import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { adsetInfo } from '@/modules/Partner/views/Agency/api/getAdsetInfo/fixtures/adsetInfo'

import Description from '../Description.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Partner Agency AdsetInfo Description', () => {
	const factory = (props = {}) => {
		return mount(Description, {
			global: {
				plugins: [i18n],
			},
			props: {
				adset: {
					...adsetInfo,
					...props,
				},
			},
		})
	}

	describe('Description rendering', () => {
		it('renders adset description when available', () => {
			const wrapper = factory({
				description: 'Test description',
			})

			expect(wrapper.find('.prose').text()).toContain('Test description')
		})

		it('renders campaign description when adset description is not available', () => {
			const wrapper = factory({
				description: null,
				campaign: {
					description: 'Campaign description',
				},
			})

			expect(wrapper.find('.prose').text()).toContain('Campaign description')
		})

		it('renders fallback when no description available', () => {
			const wrapper = factory({
				description: null,
				campaign: {
					description: null,
				},
			})

			expect(wrapper.find('.prose').html()).toContain('—')
		})
	})
})

