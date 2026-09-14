import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { createPoll } from '@/modules/Streamer/views/Link/api'
import { pollData } from '@/modules/Streamer/views/Link/api/getPoll/fixtures/pollData'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import { useLinkSetupStore } from '../setup'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

describe('Link Setup Store createPoll', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async () => {
		const setupStore = useLinkSetupStore()

		const streamerStore = useStreamerStore()
		streamerStore.profile = profileData

		return { setupStore, streamerStore }
	}

	it('createPoll – success', async () => {
		const { setupStore } = await factory()

		expect(setupStore.pollSending).toBe(false)

		const promise = setupStore.createPoll(pollData)

		expect(setupStore.pollSending).toBe(true)

		await promise

		expect(setupStore.pollSending).toBe(false)

		expect(createPoll).toHaveBeenCalled()
		expect(setupStore.poll).toEqual(pollData)
	})

	it('createPoll – fail, request error', async () => {
		const { setupStore } = await factory();

		(createPoll as Mock).mockRejectedValueOnce({ status: false })

		expect(setupStore.pollSending).toBe(false)

		const promise = setupStore.createPoll(pollData)

		expect(setupStore.pollSending).toBe(true)

		await promise

		expect(setupStore.pollSending).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(createPoll).toHaveBeenCalled()
		expect(setupStore.poll).toEqual(null)
	})

	it('createPoll – fail, no streamer data', async () => {
		const { setupStore, streamerStore } = await factory()

		streamerStore.profile = null

		setupStore.createPoll(pollData)

		expect(setupStore.pollSending).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(createPoll).not.toHaveBeenCalled()
		expect(setupStore.poll).toEqual(null)
	})
})
