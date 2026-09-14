import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { updateGoal } from '@/modules/Streamer/views/Link/api'
import { goalData } from '@/modules/Streamer/views/Link/api/getGoal/fixtures/goalData'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import { useLinkSetupStore } from '../setup'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

const updatedGoalData = {
	...goalData,
	title: 'Updated title',
}

describe('Link Setup Store updateGoal', () => {
	beforeEach(() => {
		vi.useFakeTimers()
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

	it('updateGoal – success', async () => {
		const { setupStore } = await factory()

		expect(setupStore.goalSending).toBe(false)

		const promise = setupStore.updateGoal(updatedGoalData)

		expect(setupStore.goalSending).toBe(true)

		await promise

		expect(setupStore.goalSending).toBe(false)

		expect(updateGoal).toHaveBeenCalled()
		expect(setupStore.goal).toEqual(updatedGoalData)
	})

	it('updateGoal – fail, request error', async () => {
		const { setupStore } = await factory();

		(updateGoal as Mock).mockRejectedValueOnce({ status: false })

		expect(setupStore.goalSending).toBe(false)

		const promise = setupStore.updateGoal(updatedGoalData)

		expect(setupStore.goalSending).toBe(true)

		await promise

		expect(setupStore.goalSending).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(updateGoal).toHaveBeenCalled()
		expect(setupStore.goal).toEqual(goalData)
	})

	it('updateGoal – fail, no streamer data', async () => {
		const { setupStore, streamerStore } = await factory()

		streamerStore.profile = null

		setupStore.updateGoal(updatedGoalData)

		expect(setupStore.goalSending).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(updateGoal).not.toHaveBeenCalled()
		expect(setupStore.goal).toEqual(goalData)
	})
})
