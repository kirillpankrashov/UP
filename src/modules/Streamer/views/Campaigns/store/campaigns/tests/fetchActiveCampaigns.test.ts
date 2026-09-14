import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Platform } from '@/core/types'
import { Logger } from '@/core/helpers'
import * as CampaignsApi from '@/modules/Streamer/views/Campaigns/api'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { performanceAdset } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsets/fixtures/performanceAdset'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')
vi.mock('@/modules/Streamer/views/Campaigns/api')

describe('Campaigns Store fetchActiveCampaigns', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	afterEach(() => {
		vi.restoreAllMocks()
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

	it('fail if no widget data', async () => {
		const { campaignsStore } = await factory(false)

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)

		const promise = campaignsStore.fetchActiveCampaigns()

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)

		await promise

		expect(CampaignsApi.getBrandAwarenessAdsets).not.toHaveBeenCalled()
		expect(CampaignsApi.getPerformanceAdsets).not.toHaveBeenCalled()
		expect(Logger.error).toHaveBeenCalled()
	})

	it('fetches only BA campaigns if platform is not twitch', async () => {
		const { campaignsStore, settingsStore } = await factory()

		settingsStore.widget!.platform = Platform.YOUTUBE

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)

		const promise = campaignsStore.fetchActiveCampaigns()

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.getBrandAwarenessAdsets).toHaveBeenCalled()
		expect(CampaignsApi.getPerformanceAdsets).not.toHaveBeenCalled()
		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
	})

	it('moves unavailable campaigns to inactive if exists', async () => {
		const { campaignsStore, settingsStore } = await factory()

		settingsStore.widget!.platform = Platform.YOUTUBE;
		(CampaignsApi.getBrandAwarenessAdsets as Mock).mockResolvedValueOnce({
			status: true,
			active: [],
			inactive: [],
			future: [],
			unavailable: [brandAwarenessCustomAdset],
		})

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)

		const promise = campaignsStore.fetchActiveCampaigns()

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.getBrandAwarenessAdsets).toHaveBeenCalled()
		expect(CampaignsApi.getPerformanceAdsets).not.toHaveBeenCalled()
		expect(campaignsStore.activeCampaigns.data.unavailable.length).toBe(0)
		expect(campaignsStore.activeCampaigns.data.inactive.length).toBe(1)
		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
	})

	it('moves all performance adsets to inactive if brandisExtensionEnabled is false', async () => {
		const { campaignsStore, settingsStore } = await factory()

		settingsStore.widget!.platform = Platform.TWITCH
		settingsStore.widget!.brandisExtensionEnabled = false

		;(CampaignsApi.getBrandAwarenessAdsets as Mock).mockResolvedValueOnce({
			status: true,
			active: [],
			inactive: [],
			future: [],
			unavailable: [],
		})

		;(CampaignsApi.getPerformanceAdsets as Mock).mockResolvedValueOnce({
			status: true,
			active: [performanceAdset],
			inactive: [],
			future: [performanceAdset],
			unavailable: [performanceAdset],
		})

		;(CampaignsApi.getExtensionAdsets as Mock).mockResolvedValueOnce({
			active: [],
			inactive: [],
			future: [],
			unavailable: [],
		})

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)

		const promise = campaignsStore.fetchActiveCampaigns()

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.getBrandAwarenessAdsets).toHaveBeenCalled()
		expect(CampaignsApi.getPerformanceAdsets).toHaveBeenCalled()
		expect(campaignsStore.activeCampaigns.data.unavailable.length).toBe(0)
		expect(campaignsStore.activeCampaigns.data.future.length).toBe(0)
		expect(campaignsStore.activeCampaigns.data.inactive.length).toBe(3)
		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
	})

	it('successfully fetches BA and PF campaigns', async () => {
		const { campaignsStore, settingsStore } = await factory()

		settingsStore.widget!.platform = Platform.TWITCH
		settingsStore.widget!.brandisExtensionEnabled = true;

		(CampaignsApi.getBrandAwarenessAdsets as Mock).mockResolvedValueOnce({
			status: true,
			active: [brandAwarenessCustomAdset],
			inactive: [],
			future: [],
			unavailable: [],
		})

		;(CampaignsApi.getPerformanceAdsets as Mock).mockResolvedValueOnce({
			status: true,
			active: [performanceAdset],
			inactive: [],
			future: [],
			unavailable: [],
		})

		;(CampaignsApi.getExtensionAdsets as Mock).mockResolvedValueOnce({
			active: [],
			inactive: [],
			future: [],
			unavailable: [],
		})

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)

		const promise = campaignsStore.fetchActiveCampaigns()

		expect(campaignsStore.isFetchingActiveCampaigns).toBe(true)

		await promise

		expect(CampaignsApi.getBrandAwarenessAdsets).toHaveBeenCalled()
		expect(CampaignsApi.getPerformanceAdsets).toHaveBeenCalled()
		expect(campaignsStore.activeCampaigns.data.unavailable.length).toBe(0)
		expect(campaignsStore.activeCampaigns.data.future.length).toBe(0)
		expect(campaignsStore.activeCampaigns.data.inactive.length).toBe(0)
		expect(campaignsStore.activeCampaigns.data.active.length).toBe(2)
		expect(campaignsStore.isFetchingActiveCampaigns).toBe(false)
	})
})
