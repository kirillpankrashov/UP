import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { getAnalytics } from '@/modules/Streamer/views/Link/api'
import { analytcsData } from '@/modules/Streamer/views/Link/api/getAnalytics/fixtures/analytcsData'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import { useLinkAnalyticsStore } from '../analytics'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

describe('Link Analytics Store fetchAnalytics', () => {
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

	it('fetchAnalytics – success', async () => {
		const { analyticsStore } = await factory()

		expect(analyticsStore.analyticsLoading).toBe(false)

		const promise = analyticsStore.fetchAnalytics()

		expect(analyticsStore.analyticsLoading).toBe(true)

		await promise

		expect(getAnalytics).toHaveBeenCalled()
		expect(analyticsStore.analytics).toEqual(analytcsData)
		expect(analyticsStore.analyticsLoading).toBe(false)
	})

	it('fetchAnalytics – fail, no streamer data', async () => {
		const { analyticsStore } = await factory(false)

		expect(analyticsStore.analyticsLoading).toBe(false)

		const promise = analyticsStore.fetchAnalytics()

		expect(analyticsStore.analyticsLoading).toBe(false)

		await promise

		expect(Logger.error).toHaveBeenCalled()
		expect(getAnalytics).not.toHaveBeenCalled()
		expect(analyticsStore.analytics).toEqual(null)
		expect(analyticsStore.analyticsLoading).toBe(false)
	})

	it('fetchAnalytics – fail, request error', async () => {
		const { analyticsStore } = await factory();

		(getAnalytics as Mock).mockRejectedValueOnce({ status: false })

		expect(analyticsStore.analyticsLoading).toBe(false)

		const promise = analyticsStore.fetchAnalytics()

		expect(analyticsStore.analyticsLoading).toBe(true)

		await promise

		expect(Logger.error).toHaveBeenCalled()
		expect(getAnalytics).toHaveBeenCalled()
		expect(analyticsStore.analytics).toEqual(null)
		expect(analyticsStore.analyticsLoading).toBe(false)
	})
})
