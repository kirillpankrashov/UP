import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { adsetInfo } from '@/modules/Partner/views/Agency/api/getAdsetInfo/fixtures/adsetInfo'

import Info from '../Info.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Partner Agency AdsetInfo Info', () => {
	const factory = (props: any = {}) => {
		return mount(Info, {
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

	it('renders payout type', () => {
		const wrapper = factory()
		expect(wrapper.find('[data-test="campaigns-info-payment-type"]').text()).toBe(adsetInfo.payoutType)
	})

	it('renders ad format title', () => {
		const wrapper = factory()
		expect(wrapper.find('[data-test="campaigns-info-ad-format"]').text()).toBe(adsetInfo.format.title)
	})

	it('renders frequency', () => {
		const wrapper = factory()
		expect(wrapper.find('[data-test="campaigns-info-frequency"]').text()).toBe(adsetInfo.frequency)
	})

	it('renders advertiser category', () => {
		const wrapper = factory()
		expect(wrapper.find('[data-test="campaigns-info-advertiser-category"]').text()).toBe(adsetInfo.campaign.category)
	})

	it('renders start and end dates', () => {
		const wrapper = factory()
		const dateNodes = wrapper.findAll('[data-test="campaigns-info-end-date"]')

		// В шаблоне start и end используют один и тот же data-test — проверяем оба значения по порядку.
		expect(dateNodes).toHaveLength(2)
		expect(dateNodes[0].text()).toBe(adsetInfo.dates.start)
		expect(dateNodes[1].text()).toBe(adsetInfo.dates.end)
	})
})

