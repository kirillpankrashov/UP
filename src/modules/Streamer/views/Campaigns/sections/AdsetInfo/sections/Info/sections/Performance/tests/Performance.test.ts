import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import moment from 'moment'
import { describe, expect, it, vi } from 'vitest'

import { CurrencyName, PayoutType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { performanceAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsetInfo/fixtures/performanceAdsetInfo'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import Performance from '../Performance.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string, value?: number) => {
			if (key === 'helpers.timeLeft.days') return `${value} days left`
			if (key === 'campaignSidebar.pricePerAction') return 'Price per Action'
			if (key === 'campaignSidebar.pricePerViews') return 'Price per Views'
			return key
		},
	}),
	useCurrency: () => ({
		formatCurrency: (value: number | undefined, decimals = true) => {
			if (value === undefined) return '0 USD'
			return decimals ? `${value.toFixed(1)} USD` : `${Math.floor(value)} USD`
		},
		convertCurrency: (value: number) => value,
	}),
}))

describe('Streamer Campaigns AdsetInfo Info Performance', () => {
	const factory = (props = {}) => {
		const wrapper = mount(Performance, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
			},
			props: {
				adset: {
					...performanceAdsetInfo,
					...props,
				},
			},
		})

		const streamerStore = useStreamerStore()
		const settingsStore = useSettingsStore()

		streamerStore.profile = profileData
		settingsStore.widget = widgetData

		return { wrapper, streamerStore, settingsStore }
	}

	describe('Payment type section', () => {
		it('renders payment type', async () => {
			const { wrapper } = factory({
				payoutType: 'PERFORMANCE',
			})

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-payment-type"]').text()).toBe('PERFORMANCE')
		})
	})

	describe('Payable type price section', () => {
		it('renders price per action when payable type is ACTIONS', async () => {
			const { wrapper } = factory({
				payableType: PayoutType.ACTIONS,
				creatorPayout: {
					value: 100.50,
					currency: CurrencyName.USD,
				},
			})

			await nextTick()

			const priceSection = wrapper.find('[data-test="campaigns-info-payable-type-price"]')
			expect(wrapper.text()).toContain('Price per Action')
			expect(priceSection.text()).toBe('100.5 USD')
		})

		it('renders price per views when payable type is IMPRESSIONS', async () => {
			const { wrapper } = factory({
				payableType: PayoutType.IMPRESSIONS,
				creatorPayout: {
					value: 100.50,
					currency: CurrencyName.USD,
				},
			})

			await nextTick()

			const priceSection = wrapper.find('[data-test="campaigns-info-payable-type-price"]')
			expect(wrapper.text()).toContain('Price per Views')
			expect(priceSection.text()).toBe('100.5 USD')
		})

		it('formats price with decimals for USD', async () => {
			const { wrapper, streamerStore } = factory({
				creatorPayout: {
					value: 100.50,
					currency: CurrencyName.USD,
				},
			})

			streamerStore.profile = {
				...profileData,
				currency: CurrencyName.USD,
			}

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-payable-type-price"]').text()).toBe('100.5 USD')
		})

		it('formats price without decimals for other currencies', async () => {
			const { wrapper, streamerStore } = factory({
				creatorPayout: {
					value: 100.50,
					currency: CurrencyName.RUB,
				},
			})

			streamerStore.profile = {
				...profileData,
				currency: CurrencyName.RUB,
			}

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-payable-type-price"]').text()).toBe('100 USD')
		})
	})

	describe('Advertiser category section', () => {
		it('renders advertiser category when available', async () => {
			const { wrapper } = factory({
				campaign: {
					category: 'Gaming',
				},
			})

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-advertiser-category"]').text()).toBe('Gaming')
		})

		it('renders fallback when category is not available', async () => {
			const { wrapper } = factory({
				campaign: {
					category: null,
				},
			})

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-advertiser-category"]').text()).toBe('—')
		})
	})

	describe('End date section', () => {
		it('calculates and displays days left correctly', async () => {
			const futureDate = moment().add(5, 'days').format('DD.MM.YYYY')
			const { wrapper } = factory({
				dates: {
					end: futureDate,
				},
			})

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-end-date"]').text()).toBe('4 days left')
		})

		it('shows 0 days when end date is in the past', async () => {
			const pastDate = moment().subtract(5, 'days').format('DD.MM.YYYY')
			const { wrapper } = factory({
				dates: {
					end: pastDate,
				},
			})

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-end-date"]').text()).toBe('0 days left')
		})
	})
})
