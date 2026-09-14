import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { AdsetStatus, CampaignType } from '@/core/types'
import { Logger } from '@/core/helpers'
import * as CampaignsApi from '@/modules/Streamer/views/Campaigns/api'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { performanceAdset } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsets/fixtures/performanceAdset'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')
vi.mock('@/modules/Streamer/views/Campaigns/api')

describe('Campaigns Store changeCampaignStatus', () => {
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

	it('successfully changes Brand Awareness campaign status from active to inactive', async () => {
		const { campaignsStore } = await factory()
		const activeAdset = { ...brandAwarenessCustomAdset, status: AdsetStatus.ACTIVE }

		expect(campaignsStore.activeCampaigns.data.active).toHaveLength(0)

		const promise = campaignsStore.changeCampaignStatus(activeAdset)

		expect(CampaignsApi.toggleAdsetVisibility).toHaveBeenCalledWith({
			campaignType: CampaignType.BRAND_AWARENESS,
			slug: activeAdset.slug,
			visible: true,
		})

		await promise

		expect(CampaignsApi.getBrandAwarenessAdsets).toHaveBeenCalled()
	})

	it('successfully changes Performance campaign status from inactive to active', async () => {
		const { campaignsStore } = await factory()
		const inactiveAdset = { ...performanceAdset, status: AdsetStatus.INACTIVE }

		expect(campaignsStore.activeCampaigns.data.active).toHaveLength(0)

		const promise = campaignsStore.changeCampaignStatus(inactiveAdset)

		expect(CampaignsApi.toggleAdsetVisibility).toHaveBeenCalledWith({
			campaignType: CampaignType.PERFORMANCE,
			slug: inactiveAdset.slug,
			visible: false,
		})

		await promise

		expect(CampaignsApi.getBrandAwarenessAdsets).toHaveBeenCalled()
	})

	it('handles error when changing campaign status', async () => {
		const { campaignsStore } = await factory();
		(CampaignsApi.toggleAdsetVisibility as Mock).mockRejectedValueOnce(new Error('API Error'))

		const activeAdset = { ...brandAwarenessCustomAdset, status: AdsetStatus.ACTIVE }

		const promise = campaignsStore.changeCampaignStatus(activeAdset)

		expect(CampaignsApi.toggleAdsetVisibility).toHaveBeenCalledWith({
			campaignType: CampaignType.BRAND_AWARENESS,
			slug: activeAdset.slug,
			visible: true,
		})

		await promise

		expect(Logger.error).toHaveBeenCalledWith('Error updating campaign status', true, expect.any(Error))
		expect(CampaignsApi.getBrandAwarenessAdsets).not.toHaveBeenCalled()
	})

	it('refreshes campaign list after successful status change', async () => {
		const { campaignsStore } = await factory()
		const activeAdset = { ...brandAwarenessCustomAdset, status: AdsetStatus.ACTIVE };

		(CampaignsApi.toggleAdsetVisibility as Mock).mockResolvedValueOnce({ status: true });
		(CampaignsApi.getBrandAwarenessAdsets as Mock).mockResolvedValueOnce({
			active: [activeAdset],
			inactive: [],
			future: [],
			unavailable: [],
		})

		await campaignsStore.changeCampaignStatus(activeAdset)

		expect(CampaignsApi.toggleAdsetVisibility).toHaveBeenCalled()
		expect(CampaignsApi.getBrandAwarenessAdsets).toHaveBeenCalled()
		expect(campaignsStore.activeCampaigns.data.active).toHaveLength(1)
		expect(campaignsStore.activeCampaigns.data.active[0]).toEqual(activeAdset)
	})
})
