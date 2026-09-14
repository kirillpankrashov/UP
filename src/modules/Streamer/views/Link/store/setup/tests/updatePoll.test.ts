import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { updatePoll } from '@/modules/Streamer/views/Link/api'
import { pollData } from '@/modules/Streamer/views/Link/api/getPoll/fixtures/pollData'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import { useLinkSetupStore } from '../setup'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

const updatedPollData = {
	...pollData,
	title: 'Updated title',
}

describe('Link Setup Store updatePoll', () => {
	beforeEach(() => {
		vi.useFakeTimers()
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

	it('updatePoll – success', async () => {
		const { setupStore } = await factory()

		expect(setupStore.pollSending).toBe(false)

		const promise = setupStore.updatePoll(updatedPollData)

		expect(setupStore.pollSending).toBe(true)

		await promise

		expect(setupStore.pollSending).toBe(false)

		expect(updatePoll).toHaveBeenCalled()
		expect(setupStore.poll).toEqual(updatedPollData)
	})

	it('updatePoll – fail , request error', async () => {
		const { setupStore } = await factory();

		(updatePoll as Mock).mockRejectedValueOnce({ status: false })

		expect(setupStore.pollSending).toBe(false)

		const promise = setupStore.updatePoll(updatedPollData)

		expect(setupStore.pollSending).toBe(true)

		await promise

		expect(setupStore.pollSending).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(updatePoll).toHaveBeenCalled()
		expect(setupStore.poll).toEqual(pollData)
	})

	it('updatePoll – fail, no streamer data', async () => {
		const { setupStore, streamerStore } = await factory()

		streamerStore.profile = null

		setupStore.updatePoll(updatedPollData)

		expect(setupStore.pollSending).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(updatePoll).not.toHaveBeenCalled()
		expect(setupStore.poll).toEqual(pollData)
	})
})
