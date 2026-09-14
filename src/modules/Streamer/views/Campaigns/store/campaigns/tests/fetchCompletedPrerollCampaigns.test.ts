import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import * as CampaignsApi from '@/modules/Streamer/views/Campaigns/api'
import { prerollCompletedAdset } from '@/modules/Streamer/views/Campaigns/api/getPrerollCompletedAdsets/fixtures/prerollCompletedAdset'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')
vi.mock('@/modules/Streamer/views/Campaigns/api')

describe('Campaigns Store fetchCompletedPrerollCampaigns', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (fetchWidget: boolean = true) => {
		const settingsStore = useSettingsStore()
		const campaignsStore = useCampaignsStore()

		if (fetchWidget) {
			await settingsStore.fetchWidget()
		}

		return {
			campaignsStore,
			settingsStore,
		}
	}

	it('successfully fetches completed preroll campaigns', async () => {
		const { campaignsStore } = await factory()

		const mockResponse = {
			data: [prerollCompletedAdset],
			perPage: 10,
			total: 1,
		};

		(CampaignsApi.getPrerollCompletedAdsets as Mock).mockResolvedValueOnce(mockResponse)

		expect(campaignsStore.isFetchingCompletedCampaigns).toBe(false)
		expect(campaignsStore.completedPrerollCampaigns.data).toHaveLength(0)

		const promise = campaignsStore.fetchCompletedPrerollCampaigns()

		expect(campaignsStore.isFetchingCompletedCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.getPrerollCompletedAdsets).toHaveBeenCalledWith(campaignsStore.completedPrerollCampaigns.page)
		expect(campaignsStore.completedPrerollCampaigns.data).toHaveLength(1)
		expect(campaignsStore.completedPrerollCampaigns.data[0]).toEqual(prerollCompletedAdset)
		expect(campaignsStore.completedPrerollCampaigns.perPage).toBe(10)
		expect(campaignsStore.completedPrerollCampaigns.total).toBe(1)
		expect(campaignsStore.isFetchingCompletedCampaigns).toBe(false)
	})

	it('handles empty response from API', async () => {
		const { campaignsStore } = await factory()

		const mockResponse = {
			data: [],
			perPage: 10,
			total: 0,
		};

		(CampaignsApi.getPrerollCompletedAdsets as Mock).mockResolvedValueOnce(mockResponse)

		expect(campaignsStore.isFetchingCompletedCampaigns).toBe(false)
		expect(campaignsStore.completedPrerollCampaigns.data).toHaveLength(0)

		const promise = campaignsStore.fetchCompletedPrerollCampaigns()

		expect(campaignsStore.isFetchingCompletedCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.getPrerollCompletedAdsets).toHaveBeenCalledWith(campaignsStore.completedPrerollCampaigns.page)
		expect(campaignsStore.completedPrerollCampaigns.data).toHaveLength(0)
		expect(campaignsStore.completedPrerollCampaigns.perPage).toBe(10)
		expect(campaignsStore.completedPrerollCampaigns.total).toBe(0)
		expect(campaignsStore.isFetchingCompletedCampaigns).toBe(false)
	})

	it('handles error when fetching completed preroll campaigns', async () => {
		const { campaignsStore } = await factory();
		(CampaignsApi.getPrerollCompletedAdsets as Mock).mockRejectedValueOnce(new Error('API Error'))

		expect(campaignsStore.isFetchingCompletedCampaigns).toBe(false)
		expect(campaignsStore.completedPrerollCampaigns.data).toHaveLength(0)

		const promise = campaignsStore.fetchCompletedPrerollCampaigns()

		expect(campaignsStore.isFetchingCompletedCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.getPrerollCompletedAdsets).toHaveBeenCalledWith(campaignsStore.completedPrerollCampaigns.page)
		expect(Logger.error).toHaveBeenCalledWith('Error fetching completed preroll campaigns', true, expect.any(Error))
		expect(campaignsStore.completedPrerollCampaigns.data).toHaveLength(0)
		expect(campaignsStore.completedPrerollCampaigns.perPage).toBe(0)
		expect(campaignsStore.completedPrerollCampaigns.total).toBe(0)
		expect(campaignsStore.isFetchingCompletedCampaigns).toBe(false)
	})
})
