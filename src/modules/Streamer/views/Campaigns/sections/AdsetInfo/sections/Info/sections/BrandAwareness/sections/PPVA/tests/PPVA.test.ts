import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import moment from 'moment'
import { describe, expect, it, vi } from 'vitest'

import { AdFormat, CurrencyName, Platform } from '@/core/types'
import { i18n } from '@/core/i18n'
import { brandAwarenessAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetInfo/fixtures/brandAwarenessAdsetInfo'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import PPVA from '../PPVA.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string, value?: number) => {
			if (key === 'helpers.timeLeft.days') return `${value} days left`
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

describe('Streamer Campaigns AdsetInfo Info BrandAwareness PPVA', () => {
	const factory = (props = {}) => {
		const wrapper = mount(PPVA, {
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
					...brandAwarenessAdsetInfo,
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
				payoutType: 'PPVA',
			})

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-payment-type"]').text()).toBe('PPVA')
		})
	})

	describe('Price per views section', () => {
		it('renders price per views with decimals for USD', async () => {
			const { wrapper, streamerStore } = factory({
				creatorPayout: {
					price: 100.50,
					currency: CurrencyName.USD,
				},
			})

			streamerStore.profile = {
				...profileData,
				currency: CurrencyName.USD,
			}

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-price-per-views"]').text()).toBe('100.5 USD')
		})

		it('renders price per views without decimals for other currencies', async () => {
			const { wrapper, streamerStore } = factory({
				creatorPayout: {
					price: 100.50,
					currency: CurrencyName.RUB,
				},
			})

			streamerStore.profile = {
				...profileData,
				currency: CurrencyName.RUB,
			}

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-price-per-views"]').text()).toBe('100 USD')
		})
	})

	describe('Price per action section', () => {
		it('renders price per action when daily action limit is enabled', async () => {
			const { wrapper } = factory({
				dailyActionLimit: {
					enabled: true,
					actionPrice: 100,
				},
				creatorPayout: {
					price: 100,
					currency: CurrencyName.USD,
				},
			})

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-price-per-action"]').text()).toBe('100.0 USD')
		})

		it('does not render price per action when daily action limit is disabled', async () => {
			const { wrapper } = factory({
				dailyActionLimit: {
					enabled: false,
					actionPrice: 100,
				},
			})

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-price-per-action"]').exists()).toBe(false)
		})
	})

	describe('Format section', () => {
		it('shows PiP for Yandex FS format on Twitch', async () => {
			const { wrapper, settingsStore } = factory({
				format: {
					id: AdFormat.YANDEX_FS,
					title: 'Some Format',
				},
			})

			settingsStore.widget = {
				...widgetData,
				platform: Platform.TWITCH,
			}

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-ad-format"]').text()).toBe('campaignRow.format.pip')
		})

		it('shows fullscreen for Yandex FS format on YouTube', async () => {
			const { wrapper, settingsStore } = factory({
				format: {
					id: AdFormat.YANDEX_FS,
					title: 'Some Format',
				},
			})

			settingsStore.widget = {
				...widgetData,
				platform: Platform.YOUTUBE,
			}

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-ad-format"]').text()).toBe('campaignRow.format.fullscreen')
		})

		it('shows format title for non-Yandex formats', async () => {
			const { wrapper } = factory({
				format: {
					id: 123,
					title: 'Custom Format',
				},
			})

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-ad-format"]').text()).toBe('Custom Format')
		})
	})

	describe('Frequency section', () => {
		it('renders frequency value', async () => {
			const { wrapper } = factory({
				frequency: 5,
			})

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-frequency"]').text()).toBe('5')
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

	describe('Show time section', () => {
		it('renders show time when both start and end are provided', async () => {
			const { wrapper } = factory({
				time: {
					start: '10:00:00',
					end: '22:00:00',
				},
				streamerDayLimit: null,
				streamerDayLimitShown: null,
			})

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-show-time"]').text()).toBe('10:00 - 22:00')
		})

		it('does not render show time when start is null', async () => {
			const { wrapper } = factory({
				time: {
					start: null,
					end: '22:00:00',
				},
				streamerDayLimit: null,
				streamerDayLimitShown: null,
			})

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-show-time"]').exists()).toBe(false)
		})

		it('does not render show time when end is null', async () => {
			const { wrapper } = factory({
				time: {
					start: '10:00:00',
					end: null,
				},
				streamerDayLimit: null,
				streamerDayLimitShown: null,
			})

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-show-time"]').exists()).toBe(false)
		})

		it('does not render show time when both start and end are null', async () => {
			const { wrapper } = factory({
				time: {
					start: null,
					end: null,
				},
				streamerDayLimit: null,
				streamerDayLimitShown: null,
			})

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-show-time"]').exists()).toBe(false)
		})
	})

	describe('Streamer day limit section', () => {
		it('renders streamer day limit when values are present', async () => {
			const { wrapper } = factory({
				time: {
					start: null,
					end: null,
				},
				streamerDayLimit: 5,
				streamerDayLimitShown: 2,
			})

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-show-time"]').text()).toBe('2 / 5')
		})

		it('does not render streamer day limit when value is null', async () => {
			const { wrapper } = factory({
				time: {
					start: null,
					end: null,
				},
				streamerDayLimit: null,
				streamerDayLimitShown: 2,
			})

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-show-time"]').exists()).toBe(false)
		})
	})
})
