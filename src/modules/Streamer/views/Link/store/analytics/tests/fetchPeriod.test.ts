import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { getTopByPeriod } from '@/modules/Streamer/views/Link/api'
import { topsByPeriodData } from '@/modules/Streamer/views/Link/api/getTopByPeriod/fixtures/topsByPeriodData'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import { useLinkAnalyticsStore } from '../analytics'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

describe('Link Analytics Store fetchPeriod', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (streamerFetched: boolean = true) => {
		const analyticsStore = useLinkAnalyticsStore()

		analyticsStore.topPeriod.date = [new Date(), new Date()]

		const streamerStore = useStreamerStore()
		if (streamerFetched) {
			streamerStore.profile = profileData
		}

		return { analyticsStore }
	}

	it('fetchPeriod – success', async () => {
		const { analyticsStore } = await factory()

		expect(analyticsStore.topPeriodLoading).toBe(false)

		const promise = analyticsStore.fetchPeriod()

		expect(analyticsStore.topPeriodLoading).toBe(true)

		await promise

		expect(getTopByPeriod).toHaveBeenCalled()
		expect(analyticsStore.topPeriod.data).toEqual(topsByPeriodData)
		expect(analyticsStore.topPeriodLoading).toBe(false)
	})

	it('fetchPeriod – fail, no dates selected', async () => {
		const { analyticsStore } = await factory(false)

		analyticsStore.topPeriod.date = ['', '']

		expect(analyticsStore.topPeriodLoading).toBe(false)

		const promise = analyticsStore.fetchPeriod()

		expect(analyticsStore.topPeriodLoading).toBe(false)

		await promise

		expect(analyticsStore.topPeriodLoading).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(getTopByPeriod).not.toHaveBeenCalled()
		expect(analyticsStore.topPeriod.data).toEqual([])
	})

	it('fetchPeriod – fail, no streamer data', async () => {
		const { analyticsStore } = await factory(false)

		expect(analyticsStore.topPeriodLoading).toBe(false)

		const promise = analyticsStore.fetchPeriod()

		expect(analyticsStore.topPeriodLoading).toBe(false)

		await promise

		expect(analyticsStore.topPeriodLoading).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(getTopByPeriod).not.toHaveBeenCalled()
		expect(analyticsStore.topPeriod.data).toEqual([])
	})

	it('fetchPeriod – fail, request error', async () => {
		const { analyticsStore } = await factory();

		(getTopByPeriod as Mock).mockRejectedValueOnce({ status: false })

		expect(analyticsStore.topPeriodLoading).toBe(false)

		const promise = analyticsStore.fetchPeriod()

		expect(analyticsStore.topPeriodLoading).toBe(true)

		await promise

		expect(analyticsStore.topPeriodLoading).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(getTopByPeriod).toHaveBeenCalled()
		expect(analyticsStore.topPeriod.data).toEqual([])
	})
})
