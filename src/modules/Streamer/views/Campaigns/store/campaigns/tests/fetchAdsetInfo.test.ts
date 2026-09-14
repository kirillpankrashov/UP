import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { Logger } from '@/core/helpers'
import * as CampaignsApi from '@/modules/Streamer/views/Campaigns/api'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { extensionAdset } from '@/modules/Streamer/views/Campaigns/api/getExtensionAdsets/fixtures/extensionAdset'
import { performanceAdset } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsets/fixtures/performanceAdset'
import { prerollAdset } from '@/modules/Streamer/views/Campaigns/api/getPrerollAdsets/fixtures/prerollAdset'
import { specialProjectAdset } from '@/modules/Streamer/views/Campaigns/api/getSpecialProjectAdsets/fixtures/specialProjectAdset'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')
vi.mock('@/modules/Streamer/views/Campaigns/api')

describe('Campaigns Store fetchAdsetInfo', () => {
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

	it('successfully fetches Brand Awareness campaign info', async () => {
		const { campaignsStore } = await factory()

		expect(campaignsStore.isFetchingAdsetInfo).toBe(false)
		expect(campaignsStore.adsetInfo).toBe(null)

		const promise = campaignsStore.fetchAdsetInfo(brandAwarenessCustomAdset)

		expect(campaignsStore.isFetchingAdsetInfo).toBe(true)

		await promise

		expect(CampaignsApi.getBrandAwarenessAdsetInfo).toHaveBeenCalledWith(brandAwarenessCustomAdset.slug)
		expect(CampaignsApi.getPerformanceAdsetInfo).not.toHaveBeenCalled()
		expect(CampaignsApi.getPrerollAdsetInfo).not.toHaveBeenCalled()
		expect(campaignsStore.adsetInfo).toBeDefined()
		expect(campaignsStore.adsetInfo?.campaignType).toBe(CampaignType.BRAND_AWARENESS)
		expect(campaignsStore.isFetchingAdsetInfo).toBe(false)
	})

	it('successfully fetches Performance campaign info', async () => {
		const { campaignsStore } = await factory()

		expect(campaignsStore.isFetchingAdsetInfo).toBe(false)
		expect(campaignsStore.adsetInfo).toBe(null)

		const promise = campaignsStore.fetchAdsetInfo(performanceAdset)

		expect(campaignsStore.isFetchingAdsetInfo).toBe(true)

		await promise

		expect(CampaignsApi.getPerformanceAdsetInfo).toHaveBeenCalledWith(performanceAdset.slug)
		expect(CampaignsApi.getBrandAwarenessAdsetInfo).not.toHaveBeenCalled()
		expect(CampaignsApi.getPrerollAdsetInfo).not.toHaveBeenCalled()
		expect(campaignsStore.adsetInfo).toBeDefined()
		expect(campaignsStore.adsetInfo?.campaignType).toBe(CampaignType.PERFORMANCE)
		expect(campaignsStore.isFetchingAdsetInfo).toBe(false)
	})

	it('successfully fetches Preroll campaign info', async () => {
		const { campaignsStore } = await factory()

		expect(campaignsStore.isFetchingAdsetInfo).toBe(false)
		expect(campaignsStore.adsetInfo).toBe(null)

		const promise = campaignsStore.fetchAdsetInfo(prerollAdset)

		expect(campaignsStore.isFetchingAdsetInfo).toBe(true)

		await promise

		expect(CampaignsApi.getPrerollAdsetInfo).toHaveBeenCalledWith(prerollAdset.slug)
		expect(CampaignsApi.getBrandAwarenessAdsetInfo).not.toHaveBeenCalled()
		expect(CampaignsApi.getPerformanceAdsetInfo).not.toHaveBeenCalled()
		expect(campaignsStore.adsetInfo).toBeDefined()
		expect(campaignsStore.adsetInfo?.campaignType).toBe(CampaignType.PREROLL)
		expect(campaignsStore.isFetchingAdsetInfo).toBe(false)
	})

	it('successfully fetches Extension campaign info', async () => {
		const { campaignsStore } = await factory()

		expect(campaignsStore.isFetchingAdsetInfo).toBe(false)
		expect(campaignsStore.adsetInfo).toBe(null)

		const promise = campaignsStore.fetchAdsetInfo(extensionAdset)

		expect(campaignsStore.isFetchingAdsetInfo).toBe(true)

		await promise

		expect(CampaignsApi.getExtensionAdsetInfo).toHaveBeenCalledWith(extensionAdset.slug)
		expect(CampaignsApi.getBrandAwarenessAdsetInfo).not.toHaveBeenCalled()
		expect(CampaignsApi.getPerformanceAdsetInfo).not.toHaveBeenCalled()
		expect(CampaignsApi.getPrerollAdsetInfo).not.toHaveBeenCalled()
		expect(campaignsStore.adsetInfo).toBeDefined()
		expect(campaignsStore.adsetInfo?.campaignType).toBe(CampaignType.EXTENSION)
		expect(campaignsStore.isFetchingAdsetInfo).toBe(false)
	})

	it('successfully fetches Special Project campaign info', async () => {
		const { campaignsStore } = await factory()

		expect(campaignsStore.isFetchingAdsetInfo).toBe(false)
		expect(campaignsStore.adsetInfo).toBe(null)

		const promise = campaignsStore.fetchAdsetInfo(specialProjectAdset)

		expect(campaignsStore.isFetchingAdsetInfo).toBe(true)

		await promise

		expect(CampaignsApi.getSpecialProjectAdsetInfo).toHaveBeenCalledWith(specialProjectAdset.slug)
		expect(CampaignsApi.getBrandAwarenessAdsetInfo).not.toHaveBeenCalled()
		expect(CampaignsApi.getPerformanceAdsetInfo).not.toHaveBeenCalled()
		expect(CampaignsApi.getPrerollAdsetInfo).not.toHaveBeenCalled()
		expect(CampaignsApi.getExtensionAdsetInfo).not.toHaveBeenCalled()
		expect(campaignsStore.adsetInfo).toBeDefined()
		expect(campaignsStore.adsetInfo?.campaignType).toBe(CampaignType.SPECIAL_PROJECT)
		expect(campaignsStore.isFetchingAdsetInfo).toBe(false)
	})

	it('handles error when fetching campaign info', async () => {
		const { campaignsStore } = await factory();

		(CampaignsApi.getBrandAwarenessAdsetInfo as Mock).mockRejectedValueOnce(new Error('API Error'))

		expect(campaignsStore.isFetchingAdsetInfo).toBe(false)
		expect(campaignsStore.adsetInfo).toBe(null)

		const promise = campaignsStore.fetchAdsetInfo(brandAwarenessCustomAdset)

		expect(campaignsStore.isFetchingAdsetInfo).toBe(true)

		await promise

		expect(CampaignsApi.getBrandAwarenessAdsetInfo).toHaveBeenCalledWith(brandAwarenessCustomAdset.slug)
		expect(Logger.error).toHaveBeenCalled()
		expect(campaignsStore.adsetInfo).toBe(null)
		expect(campaignsStore.isFetchingAdsetInfo).toBe(false)
	})
})
