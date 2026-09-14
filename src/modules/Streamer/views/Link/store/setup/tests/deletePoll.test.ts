import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { deletePoll } from '@/modules/Streamer/views/Link/api'
import { pollData } from '@/modules/Streamer/views/Link/api/getPoll/fixtures/pollData'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import { useLinkSetupStore } from '../setup'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

describe('Link Setup Store deletePoll', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async () => {
		const setupStore = useLinkSetupStore()
		setupStore.poll = pollData

		const streamerStore = useStreamerStore()
		streamerStore.profile = profileData

		return { setupStore, streamerStore }
	}

	it('deletePoll – success', async () => {
		const { setupStore } = await factory()

		expect(setupStore.pollSending).toBe(false)

		const promise = setupStore.deletePoll()

		expect(setupStore.pollSending).toBe(true)

		await promise

		expect(setupStore.pollSending).toBe(false)

		expect(deletePoll).toHaveBeenCalled()
		expect(setupStore.poll).toEqual(null)
	})

	it('deletePoll – fail, request error', async () => {
		const { setupStore } = await factory();

		(deletePoll as Mock).mockRejectedValueOnce({ status: false })

		expect(setupStore.pollSending).toBe(false)

		const promise = setupStore.deletePoll()

		expect(setupStore.pollSending).toBe(true)

		await promise

		expect(setupStore.pollSending).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(deletePoll).toHaveBeenCalled()
		expect(setupStore.poll).toEqual(pollData)
	})

	it('deletePoll – fail, no streamer data', async () => {
		const { setupStore, streamerStore } = await factory()

		streamerStore.profile = null

		setupStore.deletePoll()

		expect(setupStore.pollSending).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(deletePoll).not.toHaveBeenCalled()
		expect(setupStore.poll).toEqual(pollData)
	})

	it('deletePoll – fail, is no poll to delete', async () => {
		const { setupStore } = await factory()

		setupStore.poll = null

		setupStore.deletePoll()

		expect(setupStore.pollSending).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(deletePoll).not.toHaveBeenCalled()
		expect(setupStore.poll).toEqual(null)
	})
})
