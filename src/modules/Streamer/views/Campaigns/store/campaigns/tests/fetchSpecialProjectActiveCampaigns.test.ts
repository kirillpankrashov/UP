import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import * as CampaignsApi from '@/modules/Streamer/views/Campaigns/api'
import { specialProjectAdset } from '@/modules/Streamer/views/Campaigns/api/getSpecialProjectAdsets/fixtures/specialProjectAdset'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Campaigns/api')

describe('Campaigns Store fetchSpecialProjectActiveCampaigns', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async () => {
		const campaignsStore = useCampaignsStore()

		return { campaignsStore }
	}

	it('successfully fetches special project active campaigns', async () => {
		(CampaignsApi.getSpecialProjectAdsets as Mock).mockResolvedValueOnce({
			active: [specialProjectAdset],
			inactive: [],
			future: [],
			unavailable: [],
		})

		const { campaignsStore } = await factory()

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
		expect(campaignsStore.activeSpecialProjectCampaigns.data).toEqual({
			active: [],
			inactive: [],
			future: [],
			unavailable: [],
		})

		const promise = campaignsStore.fetchSpecialProjectActiveCampaigns()

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.getSpecialProjectAdsets).toHaveBeenCalled()
		expect(campaignsStore.activeSpecialProjectCampaigns.data.active).toEqual([specialProjectAdset])
		expect(campaignsStore.activeSpecialProjectCampaigns.data.inactive).toHaveLength(0)
		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
	})

	it('handles empty response from API', async () => {
		(CampaignsApi.getSpecialProjectAdsets as Mock).mockResolvedValueOnce({
			active: [],
			inactive: [],
			future: [],
			unavailable: [],
		})

		const { campaignsStore } = await factory()

		const promise = campaignsStore.fetchSpecialProjectActiveCampaigns()

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.getSpecialProjectAdsets).toHaveBeenCalled()
		expect(campaignsStore.activeSpecialProjectCampaigns.data).toEqual({
			active: [],
			inactive: [],
			future: [],
			unavailable: [],
		})
		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
	})

	it('handles error when fetching special project active campaigns', async () => {
		(CampaignsApi.getSpecialProjectAdsets as Mock).mockRejectedValueOnce(new Error('API Error'))

		const { campaignsStore } = await factory()

		const promise = campaignsStore.fetchSpecialProjectActiveCampaigns()

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.getSpecialProjectAdsets).toHaveBeenCalled()
		expect(Logger.error).toHaveBeenCalledWith(
			'Error fetching special project active campaigns',
			true,
			expect.any(Error),
		)
		expect(campaignsStore.activeSpecialProjectCampaigns.data).toEqual({
			active: [],
			inactive: [],
			future: [],
			unavailable: [],
		})
		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
	})
})

