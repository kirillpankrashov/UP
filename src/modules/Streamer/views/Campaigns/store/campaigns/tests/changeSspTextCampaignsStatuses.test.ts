import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { AdFormat, AdsetStatus } from '@/core/types'
import { Logger } from '@/core/helpers'
import * as CampaignsApi from '@/modules/Streamer/views/Campaigns/api'
import { yandexTextAdsetShort } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetsShort/fixtures/yandexTextAdsetShort'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')
vi.mock('@/modules/Streamer/views/Campaigns/api')

describe('Campaigns Store changeSspTextCampaignsStatuses', () => {
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

	it('successfully activates inactive SSP text campaigns', async () => {
		const { campaignsStore } = await factory()
		const inactiveAdset = { ...yandexTextAdsetShort, status: AdsetStatus.INACTIVE }

		campaignsStore.activeCampaignsShort.data.inactive = [inactiveAdset]
		campaignsStore.activeCampaignsShort.data.active = []

		const promise = campaignsStore.changeSspTextCampaignsStatuses(true)

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.toggleAdsetVisibility).toHaveBeenCalled()
		expect(CampaignsApi.getBrandAwarenessAdsetsShort).toHaveBeenCalled()
		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
	})

	it('successfully deactivates active SSP text campaigns', async () => {
		const { campaignsStore } = await factory()
		const activeAdset = { ...yandexTextAdsetShort, status: AdsetStatus.ACTIVE }

		campaignsStore.activeCampaignsShort.data.active = [activeAdset]
		campaignsStore.activeCampaignsShort.data.inactive = []

		const promise = campaignsStore.changeSspTextCampaignsStatuses(false)

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.toggleAdsetVisibility).toHaveBeenCalled()
		expect(CampaignsApi.getBrandAwarenessAdsetsShort).toHaveBeenCalled()
		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
	})

	it('does not make API calls if no SSP text campaigns to update', async () => {
		const { campaignsStore } = await factory()
		const nonSspAdset = {
			...yandexTextAdsetShort,
			format: AdFormat.CUSTOM, // Non-SSP format
			status: AdsetStatus.ACTIVE,
		}

		campaignsStore.activeCampaignsShort.data.active = [nonSspAdset]
		campaignsStore.activeCampaignsShort.data.inactive = []

		const promise = campaignsStore.changeSspTextCampaignsStatuses(false)

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.toggleAdsetVisibility).not.toHaveBeenCalled()
		expect(CampaignsApi.getBrandAwarenessAdsetsShort).not.toHaveBeenCalled()
		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
	})

	it('handles error when changing SSP text campaigns status', async () => {
		const { campaignsStore } = await factory()
		const activeAdset = { ...yandexTextAdsetShort, status: AdsetStatus.ACTIVE };

		(CampaignsApi.toggleAdsetVisibility as Mock).mockRejectedValueOnce(new Error('API Error'))

		campaignsStore.activeCampaignsShort.data.active = [activeAdset]
		campaignsStore.activeCampaignsShort.data.inactive = []

		const promise = campaignsStore.changeSspTextCampaignsStatuses(false)

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(true)

		await promise

		expect(Logger.error).toHaveBeenCalled()
		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
	})

	it('updates store after successful status change', async () => {
		const { campaignsStore } = await factory()
		const activeAdset = { ...yandexTextAdsetShort, status: AdsetStatus.ACTIVE };

		(CampaignsApi.toggleAdsetVisibility as Mock).mockResolvedValueOnce({ status: true });
		(CampaignsApi.getBrandAwarenessAdsetsShort as Mock).mockResolvedValueOnce({
			active: [],
			inactive: [{ ...activeAdset, status: AdsetStatus.INACTIVE }],
			future: [],
			unavailable: [],
		})

		// Mock the other endpoints to return empty data
		;(CampaignsApi.getPerformanceAdsetsShort as Mock).mockResolvedValueOnce({
			active: [],
			inactive: [],
			future: [],
			unavailable: [],
		})
		;(CampaignsApi.getExtensionAdsetsShort as Mock).mockResolvedValueOnce({
			active: [],
			inactive: [],
			future: [],
			unavailable: [],
		})

		campaignsStore.activeCampaignsShort.data.active = [activeAdset]
		campaignsStore.activeCampaignsShort.data.inactive = []

		await campaignsStore.changeSspTextCampaignsStatuses(false)

		expect(campaignsStore.activeCampaignsShort.data.active).toHaveLength(0)
		expect(campaignsStore.activeCampaignsShort.data.inactive).toHaveLength(1)
	})
})
