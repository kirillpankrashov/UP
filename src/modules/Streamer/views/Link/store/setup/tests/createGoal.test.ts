import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { createGoal } from '@/modules/Streamer/views/Link/api'
import { goalData } from '@/modules/Streamer/views/Link/api/getGoal/fixtures/goalData'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import { useLinkSetupStore } from '../setup'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

describe('Link Setup Store createGoal', () => {
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

	it('createGoal – success', async () => {
		const { setupStore } = await factory()

		expect(setupStore.goalSending).toBe(false)

		const promise = setupStore.createGoal(goalData)

		expect(setupStore.goalSending).toBe(true)

		await promise

		expect(setupStore.goalSending).toBe(false)

		expect(createGoal).toHaveBeenCalled()
		expect(setupStore.goal).toEqual(goalData)
	})

	it('createGoal – fail, request error', async () => {
		const { setupStore } = await factory();

		(createGoal as Mock).mockRejectedValueOnce({ status: false })

		expect(setupStore.goalSending).toBe(false)

		const promise = setupStore.createGoal(goalData)

		expect(setupStore.goalSending).toBe(true)

		await promise

		expect(setupStore.goalSending).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(createGoal).toHaveBeenCalled()
		expect(setupStore.goal).toEqual(null)
	})

	it('createGoal – fail, no streamer data', async () => {
		const { setupStore, streamerStore } = await factory()

		streamerStore.profile = null

		setupStore.createGoal(goalData)

		expect(setupStore.goalSending).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(createGoal).not.toHaveBeenCalled()
		expect(setupStore.goal).toEqual(null)
	})
})
