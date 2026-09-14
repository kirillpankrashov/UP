import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { deleteGoal } from '@/modules/Streamer/views/Link/api'
import { goalData } from '@/modules/Streamer/views/Link/api/getGoal/fixtures/goalData'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import { useLinkSetupStore } from '../setup'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

describe('Link Setup Store deleteGoal', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async () => {
		const setupStore = useLinkSetupStore()
		setupStore.goal = goalData

		const streamerStore = useStreamerStore()
		streamerStore.profile = profileData

		return { setupStore, streamerStore }
	}

	it('deleteGoal – success', async () => {
		const { setupStore } = await factory()

		expect(setupStore.goalSending).toBe(false)

		const promise = setupStore.deleteGoal()

		expect(setupStore.goalSending).toBe(true)

		await promise

		expect(setupStore.goalSending).toBe(false)

		expect(deleteGoal).toHaveBeenCalled()
		expect(setupStore.goal).toEqual(null)
	})

	it('deleteGoal – fail, request error', async () => {
		const { setupStore } = await factory();

		(deleteGoal as Mock).mockRejectedValueOnce({ status: false })

		expect(setupStore.goalSending).toBe(false)

		const promise = setupStore.deleteGoal()

		expect(setupStore.goalSending).toBe(true)

		await promise

		expect(setupStore.goalSending).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(deleteGoal).toHaveBeenCalled()
		expect(setupStore.goal).toEqual(goalData)
	})

	it('deleteGoal – fail, no streamer data', async () => {
		const { setupStore, streamerStore } = await factory()

		streamerStore.profile = null

		setupStore.deleteGoal()

		expect(setupStore.goalSending).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(deleteGoal).not.toHaveBeenCalled()
		expect(setupStore.goal).toEqual(goalData)
	})

	it('deleteGoal – fail, no goal to delete', async () => {
		const { setupStore } = await factory()

		setupStore.goal = null

		setupStore.deleteGoal()

		expect(setupStore.goalSending).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(deleteGoal).not.toHaveBeenCalled()
		expect(setupStore.goal).toEqual(null)
	})
})
