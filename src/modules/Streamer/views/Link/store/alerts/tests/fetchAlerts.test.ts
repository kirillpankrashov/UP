import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { getAlerts } from '@/modules/Streamer/views/Link/api'
import { alertsData } from '@/modules/Streamer/views/Link/api/getAlerts/fixtures/alertsData'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import { useLinkAlertsStore } from '../alerts'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

describe('Link Alerts Store fetchAlerts', () => {
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

	it('fetchAlerts – success', async () => {
		const { alertsStore } = await factory()

		const promise = alertsStore.fetchAlerts()

		expect(alertsStore.isLoadingData).toBe(true)

		await promise

		expect(getAlerts).toHaveBeenCalled()
		expect(alertsStore.data).toStrictEqual(alertsData)
		expect(alertsStore.isBootsraped).toBe(true)
		expect(alertsStore.isLoadingData).toBe(false)
	})

	it('fetchAlerts – fail, no streamer data', async () => {
		const { alertsStore } = await factory(false)

		const promise = alertsStore.fetchAlerts()

		expect(alertsStore.isLoadingData).toBe(false)

		await promise

		expect(getAlerts).not.toHaveBeenCalled()
		expect(alertsStore.data).toStrictEqual(null)
		expect(Logger.error).toHaveBeenCalled()
		expect(alertsStore.isBootsraped).toBe(false)
		expect(alertsStore.isLoadingData).toBe(false)
	})

	it('fetchAlerts – fail, request error', async () => {
		const { alertsStore } = await factory();

		(getAlerts as Mock).mockRejectedValueOnce({ status: false })

		const promise = alertsStore.fetchAlerts()

		expect(alertsStore.isLoadingData).toBe(true)

		await promise

		expect(getAlerts).toHaveBeenCalled()
		expect(alertsStore.data).toStrictEqual(null)
		expect(Logger.error).toHaveBeenCalled()
		expect(alertsStore.isBootsraped).toBe(true)
		expect(alertsStore.isLoadingData).toBe(false)
	})
})
