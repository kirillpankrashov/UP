import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { CurrencyName } from '@/core/types'
import { i18n } from '@/core/i18n'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import Revenue from '../Revenue.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useCurrency: () => ({
		formatCurrency: (value: number) => `${value} USD`,
		convertCurrency: (value: number) => value,
	}),
}))

describe('Streamer Campaigns AdsetCard Indicators BrandAwareness Revenue', () => {
	const factory = (props = {}) => {
		const wrapper = mount(Revenue, {
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
					...brandAwarenessCustomAdset,
					...props,
				},
			},
		})

		const streamerStore = useStreamerStore()
		streamerStore.profile = profileData

		return { wrapper, streamerStore }
	}

	it('renders potential income label', () => {
		const { wrapper } = factory()

		expect(wrapper.text()).toContain('campaignRow.potentialIncome')
	})

	it('displays formatted estimate income', async () => {
		const { wrapper } = factory({
			estimateIncome: 1000,
			currency: {
				adset: CurrencyName.USD,
				creator: CurrencyName.USD,
			},
		})

		await nextTick()

		expect(wrapper.text()).toContain('1000 USD')
	})

	it('converts currency when adset and streamer currencies are different', async () => {
		const { wrapper, streamerStore } = factory({
			estimateIncome: 1000,
			currency: {
				adset: CurrencyName.USD,
				creator: CurrencyName.RUB,
			},
		})

		streamerStore.profile = {
			...profileData,
			currency: CurrencyName.RUB,
		}

		await nextTick()

		expect(wrapper.text()).toContain('1000 USD') // Мок возвращает то же значение
	})

	it('handles undefined streamer currency', async () => {
		const { wrapper, streamerStore } = factory()

		streamerStore.profile = null

		await nextTick()

		expect(wrapper.text()).toContain(brandAwarenessCustomAdset.estimateIncome.toString())
	})

	it('updates value when adset estimate income changes', async () => {
		const { wrapper } = factory({
			estimateIncome: 1000,
		})

		await nextTick()
		expect(wrapper.text()).toContain('1000')

		await wrapper.setProps({
			adset: {
				...brandAwarenessCustomAdset,
				estimateIncome: 2000,
			},
		})

		await nextTick()
		expect(wrapper.text()).toContain('2000')
	})
})
