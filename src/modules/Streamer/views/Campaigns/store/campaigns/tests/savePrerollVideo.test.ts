import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import * as CampaignsApi from '@/modules/Streamer/views/Campaigns/api'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')
vi.mock('@/modules/Streamer/views/Campaigns/api')

describe('Campaigns Store savePrerollVideo', () => {
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

	const mockVideoData = {
		adsetSlug: 'test-adset-slug',
		video: 'test-video-url',
	}

	it('successfully creates new preroll video', async () => {
		const { campaignsStore } = await factory();
		(CampaignsApi.createPrerollVideo as Mock).mockResolvedValueOnce({
			status: true,
			data: { id: 1, ...mockVideoData },
		})

		const result = await campaignsStore.savePrerollVideo(null, mockVideoData)

		expect(CampaignsApi.createPrerollVideo).toHaveBeenCalledWith({
			slug: mockVideoData.adsetSlug,
			video: mockVideoData.video,
		})
		expect(CampaignsApi.updatePrerollVideo).not.toHaveBeenCalled()
		expect(result).toEqual({
			status: true,
			data: { id: 1, ...mockVideoData },
		})
	})

	it('successfully updates existing preroll video', async () => {
		const { campaignsStore } = await factory()
		const videoId = 1;
		(CampaignsApi.updatePrerollVideo as Mock).mockResolvedValueOnce({
			status: true,
			data: { id: videoId, ...mockVideoData },
		})

		const result = await campaignsStore.savePrerollVideo(videoId, mockVideoData)

		expect(CampaignsApi.updatePrerollVideo).toHaveBeenCalledWith(videoId, {
			slug: mockVideoData.adsetSlug,
			video: mockVideoData.video,
		})
		expect(CampaignsApi.createPrerollVideo).not.toHaveBeenCalled()
		expect(result).toEqual({
			status: true,
			data: { id: videoId, ...mockVideoData },
		})
	})

	// it('handles error when creating preroll video', async () => {
	// 	const { campaignsStore } = await factory();

	// 	// Используем стандартный подход mockRejectedValueOnce
	// 	(CampaignsApi.createPrerollVideo as Mock).mockRejectedValueOnce('API Error')

	// 	const result = await campaignsStore.savePrerollVideo(null, mockVideoData)

	// 	expect(CampaignsApi.createPrerollVideo).toHaveBeenCalledWith({
	// 		slug: mockVideoData.adsetSlug,
	// 		video: mockVideoData.video,
	// 	})
	// 	expect(Logger.error).toHaveBeenCalled()
	// 	expect(result).toBeUndefined()
	// })

	// it('handles error when updating preroll video', async () => {
	// 	const { campaignsStore } = await factory()
	// 	const videoId = 1;

	// 	// Используем стандартный подход mockRejectedValueOnce
	// 	(CampaignsApi.updatePrerollVideo as Mock).mockRejectedValueOnce('API Error')

	// 	const result = await campaignsStore.savePrerollVideo(videoId, mockVideoData)

	// 	expect(CampaignsApi.updatePrerollVideo).toHaveBeenCalledWith(videoId, {
	// 		slug: mockVideoData.adsetSlug,
	// 		video: mockVideoData.video,
	// 	})
	// 	expect(Logger.error).toHaveBeenCalled()
	// 	expect(result).toBeUndefined()
	// })

	it('handles null videoId correctly', async () => {
		const { campaignsStore } = await factory();
		(CampaignsApi.createPrerollVideo as Mock).mockResolvedValueOnce({
			status: true,
			data: { id: 1, ...mockVideoData },
		})

		await campaignsStore.savePrerollVideo(null, mockVideoData)

		expect(CampaignsApi.createPrerollVideo).toHaveBeenCalled()
		expect(CampaignsApi.updatePrerollVideo).not.toHaveBeenCalled()
	})

	it('handles non-null videoId correctly', async () => {
		const { campaignsStore } = await factory()
		const videoId = 1;
		(CampaignsApi.updatePrerollVideo as Mock).mockResolvedValueOnce({
			status: true,
			data: { id: videoId, ...mockVideoData },
		})

		await campaignsStore.savePrerollVideo(videoId, mockVideoData)

		expect(CampaignsApi.updatePrerollVideo).toHaveBeenCalled()
		expect(CampaignsApi.createPrerollVideo).not.toHaveBeenCalled()
	})
})
