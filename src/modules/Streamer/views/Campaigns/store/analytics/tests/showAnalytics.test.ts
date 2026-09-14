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

describe('Campaign Analytics Store showAnalytics', () => {
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

	it('successfully shows analytics with data', async () => {
		const { analyticsStore } = await factory();
		(CampaignsApi.getAdsetAnalytics as Mock).mockResolvedValueOnce(mockAnalyticsData)

		expect(analyticsStore.isActive).toBe(false)
		expect(analyticsStore.currentAdset).toBeNull()

		await analyticsStore.showAnalytics(brandAwarenessCustomAdset)

		expect(analyticsStore.currentAdset).toEqual(brandAwarenessCustomAdset)
		expect(analyticsStore.data).toEqual(mockAnalyticsData.data)
		expect(analyticsStore.isActive).toBe(true)
	})

	it('does not activate analytics when no data received', async () => {
		const { analyticsStore } = await factory();
		(CampaignsApi.getAdsetAnalytics as Mock).mockResolvedValueOnce({ data: [] })

		expect(analyticsStore.isActive).toBe(false)

		await analyticsStore.showAnalytics(brandAwarenessCustomAdset)

		expect(analyticsStore.currentAdset).toEqual(brandAwarenessCustomAdset)
		expect(analyticsStore.data).toEqual([])
		expect(analyticsStore.isActive).toBe(false)
	})

	// it('sets campaign data before fetching analytics', async () => {
	// 	const { analyticsStore } = await factory();
	// 	(CampaignsApi.getAdsetAnalytics as Mock).mockResolvedValueOnce(mockAnalyticsData)

	// 	const setCampaignDataSpy = vi.spyOn(analyticsStore, 'setCampaignData')

	// 	await analyticsStore.showAnalytics(brandAwarenessCustomAdset)

	// 	expect(setCampaignDataSpy).toHaveBeenCalledWith(brandAwarenessCustomAdset)
	// 	expect(setCampaignDataSpy).toHaveBeenCalledBefore(CampaignsApi.getAdsetAnalytics as Mock)
	// })

	it('handles error during analytics fetch', async () => {
		const { analyticsStore } = await factory();
		(CampaignsApi.getAdsetAnalytics as Mock).mockRejectedValueOnce('API Error')

		expect(analyticsStore.isActive).toBe(false)

		await analyticsStore.showAnalytics(brandAwarenessCustomAdset)

		expect(analyticsStore.currentAdset).toEqual(brandAwarenessCustomAdset)
		expect(Logger.error).toHaveBeenCalledWith('Error fetching adset analytics', true, 'API Error')
		expect(analyticsStore.isActive).toBe(false)
	})

	it('maintains state consistency when analytics fetch fails', async () => {
		const { analyticsStore } = await factory();
		(CampaignsApi.getAdsetAnalytics as Mock).mockRejectedValueOnce('API Error')

		const initialState = {
			isActive: analyticsStore.isActive,
			data: [...analyticsStore.data],
		}

		await analyticsStore.showAnalytics(brandAwarenessCustomAdset)

		expect(analyticsStore.isActive).toBe(initialState.isActive)
		expect(analyticsStore.data).toEqual(initialState.data)
	})
})
