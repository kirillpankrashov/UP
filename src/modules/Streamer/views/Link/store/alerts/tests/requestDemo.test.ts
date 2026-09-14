import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { requestDemo } from '@/modules/Streamer/views/Link/api'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import { useLinkAlertsStore } from '../alerts'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

describe('Link Alerts Store requestDemo', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (streamerFetched: boolean = true) => {
		const alertsStore = useLinkAlertsStore()

		const streamerStore = useStreamerStore()
		if (streamerFetched) {
			streamerStore.profile = profileData
		}

		return { alertsStore }
	}

	it('requestDemo – success', async () => {
		const { alertsStore } = await factory()

		const promise = alertsStore.requestDemo()

		expect(alertsStore.isLoadingData).toBe(true)

		await promise

		expect(requestDemo).toHaveBeenCalledWith()
		expect(alertsStore.isLoadingData).toBe(false)
	})

	it('requestDemo – fail, no streamer data', async () => {
		const { alertsStore } = await factory(false)

		const promise = alertsStore.requestDemo()

		expect(alertsStore.isLoadingData).toBe(false)

		await promise

		expect(requestDemo).not.toHaveBeenCalled()
		expect(Logger.error).toHaveBeenCalled()
		expect(alertsStore.isLoadingData).toBe(false)
	})

	it('requestDemo – fail, request error', async () => {
		const { alertsStore } = await factory();

		(requestDemo as Mock).mockRejectedValueOnce({ status: false })

		const promise = alertsStore.requestDemo()

		expect(alertsStore.isLoadingData).toBe(true)

		await promise

		expect(requestDemo).toHaveBeenCalledWith()
		expect(Logger.error).toHaveBeenCalled()
		expect(alertsStore.isLoadingData).toBe(false)
	})
})
