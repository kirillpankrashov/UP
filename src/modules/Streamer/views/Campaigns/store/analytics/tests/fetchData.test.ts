import moment from 'moment'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import * as CampaignsApi from '@/modules/Streamer/views/Campaigns/api'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { useCampaignAnalyticsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')
vi.mock('@/modules/Streamer/views/Campaigns/api')

describe('Campaign Analytics Store fetchData', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const mockAnalyticsData = {
		data: [
			{
				date: '2024-01-01',
				impressions: 100,
				clicks: 10,
			},
			{
				date: '2024-01-02',
				impressions: 200,
				clicks: 20,
			},
		],
	}

	const factory = async (fetchWidget: boolean = true) => {
		const streamerStore = useStreamerStore()
		const settingsStore = useSettingsStore()
		const analyticsStore = useCampaignAnalyticsStore()

		streamerStore.profile = profileData

		if (fetchWidget) {
			await settingsStore.fetchWidget()
		}

		return {
			analyticsStore,
			settingsStore,
			streamerStore,
		}
	}

	it('successfully fetches analytics data', async () => {
		const { analyticsStore, streamerStore } = await factory();

		(CampaignsApi.getAdsetAnalytics as Mock).mockResolvedValueOnce(mockAnalyticsData)

		analyticsStore.setCampaignData(brandAwarenessCustomAdset)

		expect(analyticsStore.isFetchingData).toBe(false)

		const promise = analyticsStore.fetchData()

		expect(analyticsStore.isFetchingData).toBe(true)

		await promise

		expect(CampaignsApi.getAdsetAnalytics).toHaveBeenCalledWith({
			streamerId: streamerStore.profile!.userId,
			slug: brandAwarenessCustomAdset.slug,
			start: moment(analyticsStore.currentDates[0]).format('YYYY-MM-DD'),
			end: moment(analyticsStore.currentDates[1]).format('YYYY-MM-DD'),
		})
		expect(analyticsStore.data).toEqual(mockAnalyticsData.data)
		expect(analyticsStore.isFetchingData).toBe(false)
	})

	it('does not fetch data if streamer profile is not found', async () => {
		const { analyticsStore, streamerStore } = await factory()

		streamerStore.profile = null

		analyticsStore.setCampaignData(brandAwarenessCustomAdset)

		await analyticsStore.fetchData()

		expect(Logger.error).toHaveBeenCalledWith('Streamer profile not found')
		expect(CampaignsApi.getAdsetAnalytics).not.toHaveBeenCalled()
		expect(analyticsStore.isFetchingData).toBe(false)
	})

	it('does not fetch data if currentAdset is not set', async () => {
		const { analyticsStore } = await factory()

		await analyticsStore.fetchData()

		expect(CampaignsApi.getAdsetAnalytics).not.toHaveBeenCalled()
		expect(analyticsStore.isFetchingData).toBe(false)
	})

	it('does not fetch data if currentDates are not set', async () => {
		const { analyticsStore } = await factory()

		analyticsStore.currentAdset = brandAwarenessCustomAdset
		analyticsStore.currentDates = [null as unknown as Date, null as unknown as Date]

		await analyticsStore.fetchData()

		expect(CampaignsApi.getAdsetAnalytics).not.toHaveBeenCalled()
		expect(analyticsStore.isFetchingData).toBe(false)
	})

	it('handles error when fetching analytics data', async () => {
		const { analyticsStore } = await factory();
		(CampaignsApi.getAdsetAnalytics as Mock).mockRejectedValueOnce('API Error')

		analyticsStore.setCampaignData(brandAwarenessCustomAdset)

		expect(analyticsStore.isFetchingData).toBe(false)

		await analyticsStore.fetchData()

		expect(Logger.error).toHaveBeenCalledWith('Error fetching adset analytics', true, 'API Error')
		expect(analyticsStore.isFetchingData).toBe(false)
	})

	it('ensures isFetchingData is false after error', async () => {
		const { analyticsStore } = await factory();
		(CampaignsApi.getAdsetAnalytics as Mock).mockRejectedValueOnce('API Error')

		analyticsStore.setCampaignData(brandAwarenessCustomAdset)
		analyticsStore.isFetchingData = true

		await analyticsStore.fetchData()

		expect(analyticsStore.isFetchingData).toBe(false)
	})
})
