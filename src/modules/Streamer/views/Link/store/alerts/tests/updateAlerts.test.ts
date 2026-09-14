import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { updateAlerts } from '@/modules/Streamer/views/Link/api'
import { alertsData } from '@/modules/Streamer/views/Link/api/getAlerts/fixtures/alertsData'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import { useLinkAlertsStore } from '../alerts'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

describe('Link Alerts Store updateAlerts', () => {
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

	it('updateAlerts – success', async () => {
		const { alertsStore } = await factory()

		const promise = alertsStore.updateAlerts(alertsData)

		expect(alertsStore.isLoadingData).toBe(true)

		await promise

		expect(updateAlerts).toHaveBeenCalledWith(alertsData)
		expect(alertsStore.data).toStrictEqual(alertsData)
		expect(alertsStore.isLoadingData).toBe(false)
	})

	it('updateAlerts – fail, no streamer data', async () => {
		const { alertsStore } = await factory(false)

		const promise = alertsStore.updateAlerts(alertsData)

		expect(alertsStore.isLoadingData).toBe(false)

		await promise

		expect(updateAlerts).not.toHaveBeenCalled()
		expect(alertsStore.data).toStrictEqual(null)
		expect(Logger.error).toHaveBeenCalled()
		expect(alertsStore.isLoadingData).toBe(false)
	})

	it('updateAlerts – fail, request error', async () => {
		const { alertsStore } = await factory();

		(updateAlerts as Mock).mockRejectedValueOnce({ status: false })

		const promise = alertsStore.updateAlerts(alertsData)

		expect(alertsStore.isLoadingData).toBe(true)

		await promise

		expect(updateAlerts).toHaveBeenCalledWith(alertsData)
		expect(alertsStore.data).toStrictEqual(null)
		expect(Logger.error).toHaveBeenCalled()
		expect(alertsStore.isLoadingData).toBe(false)
	})
})
