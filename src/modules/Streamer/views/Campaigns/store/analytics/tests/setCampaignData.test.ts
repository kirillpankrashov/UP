import moment from 'moment'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { useCampaignAnalyticsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')
vi.mock('@/modules/Streamer/views/Campaigns/api')

describe('Campaign Analytics Store setCampaignData', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (fetchWidget: boolean = true) => {
		const settingsStore = useSettingsStore()
		const analyticsStore = useCampaignAnalyticsStore()

		if (fetchWidget) {
			await settingsStore.fetchWidget()
		}

		return {
			analyticsStore,
			settingsStore,
		}
	}

	it('successfully sets campaign data', async () => {
		const { analyticsStore } = await factory()

		analyticsStore.setCampaignData(brandAwarenessCustomAdset)

		expect(analyticsStore.currentAdset).toEqual(brandAwarenessCustomAdset)
		expect(analyticsStore.campaignDates[0]).toEqual(moment('12.12.2023', 'DD.MM.YYYY').toDate())
		expect(analyticsStore.campaignDates[1]).toEqual(moment('13.12.2024', 'DD.MM.YYYY').toDate())
		expect(analyticsStore.currentDates).toEqual(analyticsStore.campaignDates)
	})

	it('updates dates correctly with different date format', async () => {
		const { analyticsStore } = await factory()
		const adsetWithDifferentDates = {
			...brandAwarenessCustomAdset,
			dates: {
				start: '15.06.2024',
				end: '20.06.2024',
			},
		}

		analyticsStore.setCampaignData(adsetWithDifferentDates)

		expect(analyticsStore.currentAdset).toEqual(adsetWithDifferentDates)
		expect(analyticsStore.campaignDates[0]).toEqual(moment('15.06.2024', 'DD.MM.YYYY').toDate())
		expect(analyticsStore.campaignDates[1]).toEqual(moment('20.06.2024', 'DD.MM.YYYY').toDate())
		expect(analyticsStore.currentDates).toEqual(analyticsStore.campaignDates)
	})

	it('handles campaign data update multiple times', async () => {
		const { analyticsStore } = await factory()

		// First update
		analyticsStore.setCampaignData(brandAwarenessCustomAdset)
		const firstDates = [...analyticsStore.campaignDates]

		// Second update with different dates
		const updatedAdset = {
			...brandAwarenessCustomAdset,
			dates: {
				start: '10.01.2024',
				end: '20.01.2024',
			},
		}
		analyticsStore.setCampaignData(updatedAdset)

		expect(analyticsStore.currentAdset).toEqual(updatedAdset)
		expect(analyticsStore.campaignDates).not.toEqual(firstDates)
		expect(analyticsStore.campaignDates[0]).toEqual(moment('10.01.2024', 'DD.MM.YYYY').toDate())
		expect(analyticsStore.campaignDates[1]).toEqual(moment('20.01.2024', 'DD.MM.YYYY').toDate())
		expect(analyticsStore.currentDates).toEqual(analyticsStore.campaignDates)
	})

	it('correctly copies dates to currentDates', async () => {
		const { analyticsStore } = await factory()

		analyticsStore.setCampaignData(brandAwarenessCustomAdset)

		// Проверяем что даты скопированы, а не переданы по ссылке
		expect(analyticsStore.currentDates).not.toBe(analyticsStore.campaignDates)
		expect(analyticsStore.currentDates[0]).toEqual(analyticsStore.campaignDates[0])
		expect(analyticsStore.currentDates[1]).toEqual(analyticsStore.campaignDates[1])
	})
})
