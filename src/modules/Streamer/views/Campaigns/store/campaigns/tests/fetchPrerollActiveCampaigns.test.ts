import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import * as CampaignsApi from '@/modules/Streamer/views/Campaigns/api'
import { prerollAdset } from '@/modules/Streamer/views/Campaigns/api/getPrerollAdsets/fixtures/prerollAdset'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')
vi.mock('@/modules/Streamer/views/Campaigns/api')

describe('Campaigns Store fetchPrerollActiveCampaigns', () => {
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

	it('successfully fetches preroll active campaigns', async () => {
		const { campaignsStore } = await factory();
		(CampaignsApi.getPrerollAdsets as Mock).mockResolvedValueOnce([prerollAdset])

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
		expect(campaignsStore.activePrerollCampaigns).toHaveLength(0)

		const promise = campaignsStore.fetchPrerollActiveCampaigns()

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.getPrerollAdsets).toHaveBeenCalled()
		expect(campaignsStore.activePrerollCampaigns).toHaveLength(1)
		expect(campaignsStore.activePrerollCampaigns[0]).toEqual(prerollAdset)
		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
	})

	it('handles empty response from API', async () => {
		const { campaignsStore } = await factory();
		(CampaignsApi.getPrerollAdsets as Mock).mockResolvedValueOnce([])

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
		expect(campaignsStore.activePrerollCampaigns).toHaveLength(0)

		const promise = campaignsStore.fetchPrerollActiveCampaigns()

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.getPrerollAdsets).toHaveBeenCalled()
		expect(campaignsStore.activePrerollCampaigns).toHaveLength(0)
		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
	})

	it('handles error when fetching preroll campaigns', async () => {
		const { campaignsStore } = await factory();
		(CampaignsApi.getPrerollAdsets as Mock).mockRejectedValueOnce(new Error('API Error'))

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
		expect(campaignsStore.activePrerollCampaigns).toHaveLength(0)

		const promise = campaignsStore.fetchPrerollActiveCampaigns()

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.getPrerollAdsets).toHaveBeenCalled()
		expect(Logger.error).toHaveBeenCalledWith('Error fetching preroll active campaigns', true, expect.any(Error))
		expect(campaignsStore.activePrerollCampaigns).toHaveLength(0)
		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
	})
})
