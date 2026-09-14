import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import * as CampaignsApi from '@/modules/Streamer/views/Campaigns/api'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')
vi.mock('@/modules/Streamer/views/Campaigns/api')

describe('Campaigns Store fetchCompletedCampaigns', () => {
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

	it('fetchCompletedCampaigns - fail', async () => {
		const { campaignsStore } = await factory()

		expect(campaignsStore.isFetchingCompletedCampaigns).toBe(false)

		const promise = campaignsStore.fetchCompletedCampaigns()

		expect(campaignsStore.isFetchingCompletedCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.getBrandAwarenessCompletedAdsets).toHaveBeenCalled()
		expect(campaignsStore.completedCampaigns.perPage).toBe(10)
		expect(campaignsStore.completedCampaigns.total).toBe(10)
		expect(campaignsStore.completedCampaigns.data.length).toBeGreaterThan(0)
		expect(campaignsStore.isFetchingCompletedCampaigns).toBe(false)
	})

	it('fetchCompletedCampaigns - success', async () => {
		const { campaignsStore } = await factory();

		(CampaignsApi.getBrandAwarenessCompletedAdsets as Mock).mockRejectedValueOnce({ status: false })

		expect(campaignsStore.isFetchingCompletedCampaigns).toBe(false)

		const promise = campaignsStore.fetchCompletedCampaigns()

		expect(campaignsStore.isFetchingCompletedCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.getBrandAwarenessCompletedAdsets).toHaveBeenCalled()
		expect(campaignsStore.completedCampaigns.perPage).toBe(0)
		expect(campaignsStore.completedCampaigns.total).toBe(0)
		expect(campaignsStore.completedCampaigns.data.length).toBe(0)
		expect(Logger.error).toHaveBeenCalled()
		expect(campaignsStore.isFetchingCompletedCampaigns).toBe(false)
	})
})
