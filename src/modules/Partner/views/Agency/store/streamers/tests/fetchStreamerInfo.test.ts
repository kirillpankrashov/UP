import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { getStreamerInfo } from '@/modules/Partner/views/Agency/api'
import { streamerInfo as streamerInfoData } from '@/modules/Partner/views/Agency/api/getStreamerInfo/fixtures/streamerInfo'

import { useAgencyStreamersStore } from '../streamers'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Agency/api')

describe('Agency Streamers Store fetchStreamerInfo', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('fetchStreamerInfo – early return when streamerId matches', async () => {
		const store = useAgencyStreamersStore()
		store.streamerId = 10
		store.settingsSidebarVisible = false

		await store.fetchStreamerInfo(10)

		expect(store.settingsSidebarVisible).toBe(true)
		expect(store.isFetchingStreamerInfo).toBe(false)
		expect(getStreamerInfo).not.toHaveBeenCalled()
		expect(store.streamerInfo).toBeNull()
	})

	it('fetchStreamerInfo – success, sets streamerId/streamerInfo and toggles loading', async () => {
		const store = useAgencyStreamersStore()
		const streamerId = 11

		;(getStreamerInfo as Mock).mockResolvedValueOnce(streamerInfoData)

		expect(store.settingsSidebarVisible).toBe(false)
		expect(store.isFetchingStreamerInfo).toBe(false)

		const promise = store.fetchStreamerInfo(streamerId)

		expect(store.settingsSidebarVisible).toBe(true)
		expect(store.isFetchingStreamerInfo).toBe(true)

		await promise

		expect(getStreamerInfo).toHaveBeenCalledWith(streamerId)
		expect(store.streamerId).toBe(streamerId)
		expect(store.streamerInfo).toEqual(streamerInfoData)
		expect(store.isFetchingStreamerInfo).toBe(false)
	})

	it('fetchStreamerInfo – fail, logs error and keeps streamerInfo null', async () => {
		const store = useAgencyStreamersStore()
		const streamerId = 12
		const error = new Error('Streamer info error')

		;(getStreamerInfo as Mock).mockRejectedValueOnce(error)

		const promise = store.fetchStreamerInfo(streamerId)

		expect(store.settingsSidebarVisible).toBe(true)
		expect(store.isFetchingStreamerInfo).toBe(true)

		await promise

		expect(Logger.error).toHaveBeenCalledWith('Error fetching streamer info', true, error)
		expect(store.streamerId).toBeNull()
		expect(store.streamerInfo).toBeNull()
		expect(store.isFetchingStreamerInfo).toBe(false)
	})
})

