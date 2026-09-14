import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'
import { getAnalytics } from '@/modules/Streamer/views/Wallet/api'
import { analyticsData } from '@/modules/Streamer/views/Wallet/api/getAnalytics/fixtures/analyticsData'

import { useWalletAnalyticsStore } from '../analytics'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Wallet/api')

describe('Settings Wallet Analytics fetchAnalytics', () => {
	beforeEach(() => {
		vi.useFakeTimers()
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (fetchAnalytics = true) => {
		const analyticsStore = useWalletAnalyticsStore()
		const streamerStore = useStreamerStore()

		streamerStore.profile = profileData

		if (fetchAnalytics) {
			await analyticsStore.fetchAnalytics()
		}

		return { analyticsStore, streamerStore }
	}

	it('fetchAnalytics – success', async () => {
		const { analyticsStore } = await factory()

		expect(analyticsStore.isFetchingData).toBe(false)

		const promise = analyticsStore.fetchAnalytics()

		expect(analyticsStore.isFetchingData).toBe(true)

		await promise

		expect(analyticsStore.isFetchingData).toBe(false)

		expect(getAnalytics).toHaveBeenCalled()
		expect(analyticsStore.data).toEqual(analyticsData)
	})

	it('fetchAnalytics – fail if no streamer data', async () => {
		const { analyticsStore, streamerStore } = await factory(false)

		streamerStore.profile = null

		expect(analyticsStore.isFetchingData).toBe(false)

		const promise = analyticsStore.fetchAnalytics()

		expect(analyticsStore.isFetchingData).toBe(false)

		await promise

		expect(analyticsStore.isFetchingData).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(getAnalytics).not.toHaveBeenCalled()
		expect(analyticsStore.data).toEqual([])
	})

	it('fetchAnalytics – fail if getAnalytics fails', async () => {
		const { analyticsStore } = await factory(false);

		(getAnalytics as Mock).mockRejectedValueOnce({ status: false })

		expect(analyticsStore.isFetchingData).toBe(false)

		const promise = analyticsStore.fetchAnalytics()

		expect(analyticsStore.isFetchingData).toBe(true)

		await promise

		expect(analyticsStore.isFetchingData).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(getAnalytics).toHaveBeenCalled()
		expect(analyticsStore.data).toEqual([])
	})

	it('fetchAnalytics – fail if there is no streamer data', async () => {
		const { analyticsStore, streamerStore } = await factory(false)

		streamerStore.profile = null

		expect(analyticsStore.isFetchingData).toBe(false)

		analyticsStore.fetchAnalytics()

		expect(analyticsStore.isFetchingData).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(getAnalytics).not.toHaveBeenCalled()
		expect(analyticsStore.data).toEqual([])
	})
})
