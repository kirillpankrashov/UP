import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import * as CampaignsApi from '@/modules/Streamer/views/Campaigns/api'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')
vi.mock('@/modules/Streamer/views/Campaigns/api')

describe('Campaigns Store fetchBrandAwarenessProductLink', () => {
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

	it('successfully fetches brand awareness product link', async () => {
		const { campaignsStore } = await factory()
		const mockUrl = 'https://example.com/product';
		(CampaignsApi.getBrandAwarenessProductLink as Mock).mockResolvedValueOnce({
			status: true,
			data: {
				url: mockUrl,
			},
		})

		const creativeSlug = 'test-creative-slug'
		const result = await campaignsStore.fetchBrandAwarenessProductLink(creativeSlug)

		expect(CampaignsApi.getBrandAwarenessProductLink).toHaveBeenCalledWith(creativeSlug)
		expect(result).toBe(mockUrl)
	})

	it('returns empty string if API response status is false', async () => {
		const { campaignsStore } = await factory();
		(CampaignsApi.getBrandAwarenessProductLink as Mock).mockResolvedValueOnce({
			status: false,
			data: {
				url: 'https://example.com/product',
			},
		})

		const creativeSlug = 'test-creative-slug'
		const result = await campaignsStore.fetchBrandAwarenessProductLink(creativeSlug)

		expect(CampaignsApi.getBrandAwarenessProductLink).toHaveBeenCalledWith(creativeSlug)
		expect(result).toBe('')
	})

	it('handles error when fetching product link', async () => {
		const { campaignsStore } = await factory();
		(CampaignsApi.getBrandAwarenessProductLink as Mock).mockRejectedValueOnce(new Error('API Error'))

		const creativeSlug = 'test-creative-slug'
		const result = await campaignsStore.fetchBrandAwarenessProductLink(creativeSlug)

		expect(CampaignsApi.getBrandAwarenessProductLink).toHaveBeenCalledWith(creativeSlug)
		expect(Logger.error).toHaveBeenCalledWith('Error fetching brand awareness product link', true, expect.any(Error))
		expect(result).toBeUndefined()
	})
})
