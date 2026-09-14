import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { getStatistics } from '@/modules/Streamer/views/Link/api'
import { statisticsData } from '@/modules/Streamer/views/Link/api/getStatistics/fixtures/statisticsData'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import { useLinkAnalyticsStore } from '../analytics'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

describe('Link Analytics Store fetchStatistics', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (streamerFetched: boolean = true) => {
		const analyticsStore = useLinkAnalyticsStore()

		const streamerStore = useStreamerStore()
		if (streamerFetched) {
			streamerStore.profile = profileData
		}

		return { analyticsStore }
	}

	it('fetchStatistics – success', async () => {
		const { analyticsStore } = await factory()

		expect(analyticsStore.statisticsLoading).toBe(false)

		const promise = analyticsStore.fetchStatistics()

		expect(analyticsStore.statisticsLoading).toBe(true)

		await promise

		expect(getStatistics).toHaveBeenCalled()
		expect(analyticsStore.statistics).toEqual(statisticsData)
		expect(analyticsStore.statisticsLoading).toBe(false)
	})


	it('fetchStatistics – fail, no streamer data', async () => {
		const { analyticsStore } = await factory(false)

		expect(analyticsStore.statisticsLoading).toBe(false)

		const promise = analyticsStore.fetchStatistics()

		expect(analyticsStore.statisticsLoading).toBe(false)

		await promise

		expect(analyticsStore.statisticsLoading).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(getStatistics).not.toHaveBeenCalled()
		expect(analyticsStore.statistics).toEqual(null)
	})

	it('fetchStatistics – fail, request error', async () => {
		const { analyticsStore } = await factory();

		(getStatistics as Mock).mockRejectedValueOnce({ status: false })

		expect(analyticsStore.statisticsLoading).toBe(false)

		const promise = analyticsStore.fetchStatistics()

		expect(analyticsStore.statisticsLoading).toBe(true)

		await promise

		expect(analyticsStore.statisticsLoading).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(getStatistics).toHaveBeenCalled()
		expect(analyticsStore.statistics).toEqual(null)
	})
})
