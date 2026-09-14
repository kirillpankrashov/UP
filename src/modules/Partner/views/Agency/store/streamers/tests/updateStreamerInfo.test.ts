import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { updateStreamerInfo } from '@/modules/Partner/views/Agency/api'
import { streamerInfo as streamerInfoData } from '@/modules/Partner/views/Agency/api/getStreamerInfo/fixtures/streamerInfo'

import { useAgencyStreamersStore } from '../streamers'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Agency/api')

describe('Agency Streamers Store updateStreamerInfo', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('updateStreamerInfo – early return when streamerId or streamerInfo missing', async () => {
		const store = useAgencyStreamersStore()

		// streamerId exists but streamerInfo missing
		store.streamerId = 1
		store.streamerInfo = null

		await store.updateStreamerInfo(streamerInfoData as any)

		expect(Logger.warning).toHaveBeenCalledWith('No streamer currently selected')
		expect(updateStreamerInfo).not.toHaveBeenCalled()

		// streamerInfo exists but streamerId missing
		store.streamerId = null
		store.streamerInfo = streamerInfoData

		await store.updateStreamerInfo(streamerInfoData as any)

		expect(updateStreamerInfo).not.toHaveBeenCalled()
	})

	it('updateStreamerInfo – success, toggles loading and calls updateStreamerInfo', async () => {
		const store = useAgencyStreamersStore()

		store.streamerId = 5
		store.streamerInfo = streamerInfoData

		const promise = store.updateStreamerInfo(streamerInfoData)

		expect(store.isFormUpdating).toBe(true)

		await promise

		expect(updateStreamerInfo).toHaveBeenCalledWith(5, streamerInfoData)
		expect(store.isFormUpdating).toBe(false)
		expect(Logger.warning).not.toHaveBeenCalled()
	})

	it('updateStreamerInfo – fail, propagates error and resets loading', async () => {
		const store = useAgencyStreamersStore()

		store.streamerId = 6
		store.streamerInfo = streamerInfoData

		const error = new Error('Update streamer info error')
		;(updateStreamerInfo as Mock).mockRejectedValueOnce(error)

		const promise = store.updateStreamerInfo(streamerInfoData)

		expect(store.isFormUpdating).toBe(true)

		await expect(promise).rejects.toThrow('Update streamer info error')

		expect(Logger.warning).not.toHaveBeenCalled()
		expect(store.isFormUpdating).toBe(false)
	})
})

