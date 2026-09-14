import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { getStreamerAdsets } from '@/modules/Partner/views/Agency/api'
import { streamerAdsets as streamerAdsetsData } from '@/modules/Partner/views/Agency/api/getStreamerAdsets/fixtures/streamerAdsets'

import { useAgencyStreamersStore } from '../streamers'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Agency/api')

describe('Agency Streamers Store fetchStreamerAdsets', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('fetchStreamerAdsets – early return when streamerId matches', async () => {
		const store = useAgencyStreamersStore()
		store.streamerId = 1
		store.adsetsSidebarVisible = false

		await store.fetchStreamerAdsets(1)

		expect(store.adsetsSidebarVisible).toBe(true)
		expect(store.isFetchingStreamerAdsets).toBe(false)
		expect(getStreamerAdsets).not.toHaveBeenCalled()
		expect(store.streamerCampaigns).toBeNull()
	})

	it('fetchStreamerAdsets – success, sets streamerId/streamerCampaigns and toggles loading', async () => {
		const store = useAgencyStreamersStore()
		const streamerId = 2

		;(getStreamerAdsets as Mock).mockResolvedValueOnce(streamerAdsetsData)

		expect(store.adsetsSidebarVisible).toBe(false)

		const promise = store.fetchStreamerAdsets(streamerId)

		expect(store.adsetsSidebarVisible).toBe(true)
		expect(store.isFetchingStreamerAdsets).toBe(true)

		await promise

		expect(getStreamerAdsets).toHaveBeenCalledWith(streamerId)
		expect(store.streamerId).toBe(streamerId)
		expect(store.streamerCampaigns).toEqual(streamerAdsetsData)
		expect(store.isFetchingStreamerAdsets).toBe(false)
		expect(Logger.error).not.toHaveBeenCalled()
	})

	it('fetchStreamerAdsets – fail, propagates error and resets loading', async () => {
		const store = useAgencyStreamersStore()
		const streamerId = 3
		const error = new Error('Streamer adsets error')

		;(getStreamerAdsets as Mock).mockRejectedValueOnce(error)

		const promise = store.fetchStreamerAdsets(streamerId)

		expect(store.isFetchingStreamerAdsets).toBe(true)

		await expect(promise).rejects.toThrow('Streamer adsets error')

		expect(store.isFetchingStreamerAdsets).toBe(false)
		expect(store.streamerId).toBeNull()
		expect(store.streamerCampaigns).toBeNull()
	})
})

