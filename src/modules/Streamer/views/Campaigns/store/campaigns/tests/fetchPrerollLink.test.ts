import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import * as CampaignsApi from '@/modules/Streamer/views/Campaigns/api'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')
vi.mock('@/modules/Streamer/views/Campaigns/api')

describe('Campaigns Store fetchPrerollLink', () => {
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

	it('successfully fetches preroll link', async () => {
		const { campaignsStore } = await factory()
		const mockUrl = 'https://example.com/preroll';
		(CampaignsApi.getPrerollLink as Mock).mockResolvedValueOnce({
			status: true,
			data: {
				url: mockUrl,
			},
		})

		const adsetSlug = 'test-adset-slug'
		const result = await campaignsStore.fetchPrerollLink(adsetSlug)

		expect(CampaignsApi.getPrerollLink).toHaveBeenCalledWith(adsetSlug)
		expect(result).toBe(mockUrl)
	})

	it('returns empty string if API response status is false', async () => {
		const { campaignsStore } = await factory();
		(CampaignsApi.getPrerollLink as Mock).mockResolvedValueOnce({
			status: false,
			data: {
				url: 'https://example.com/preroll',
			},
		})

		const adsetSlug = 'test-adset-slug'
		const result = await campaignsStore.fetchPrerollLink(adsetSlug)

		expect(CampaignsApi.getPrerollLink).toHaveBeenCalledWith(adsetSlug)
		expect(result).toBeUndefined()
	})

	it('returns empty string if API response has no url', async () => {
		const { campaignsStore } = await factory();
		(CampaignsApi.getPrerollLink as Mock).mockResolvedValueOnce({
			status: true,
			data: {},
		})

		const adsetSlug = 'test-adset-slug'
		const result = await campaignsStore.fetchPrerollLink(adsetSlug)

		expect(CampaignsApi.getPrerollLink).toHaveBeenCalledWith(adsetSlug)
		expect(result).toBe('')
	})

	it('handles error when fetching preroll link', async () => {
		const { campaignsStore } = await factory();
		(CampaignsApi.getPrerollLink as Mock).mockRejectedValueOnce(new Error('API Error'))

		const adsetSlug = 'test-adset-slug'
		const result = await campaignsStore.fetchPrerollLink(adsetSlug)

		expect(CampaignsApi.getPrerollLink).toHaveBeenCalledWith(adsetSlug)
		expect(Logger.error).toHaveBeenCalledWith('Error fetching preroll link', true, expect.any(Error))
		expect(result).toBeUndefined()
	})
})
