import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { getTops } from '@/modules/Streamer/views/Link/api'
import { topsData } from '@/modules/Streamer/views/Link/api/getTops/fixtures/topsData'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import { useLinkAnalyticsStore } from '../analytics'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

describe('Link Analytics Store fetchTops', () => {
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

	it('fetchTops – success', async () => {
		const { analyticsStore } = await factory()

		expect(analyticsStore.topsLoading).toBe(false)

		const promise = analyticsStore.fetchTops()

		expect(analyticsStore.topsLoading).toBe(true)

		await promise

		expect(getTops).toHaveBeenCalled()
		expect(analyticsStore.tops).toEqual(topsData)
		expect(analyticsStore.topsLoading).toBe(false)
	})


	it('fetchTops – fail, no streamer data', async () => {
		const { analyticsStore } = await factory(false)

		expect(analyticsStore.topsLoading).toBe(false)

		const promise = analyticsStore.fetchTops()

		expect(analyticsStore.topsLoading).toBe(false)

		await promise

		expect(analyticsStore.topsLoading).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(getTops).not.toHaveBeenCalled()
		expect(analyticsStore.tops).toEqual(null)
	})

	it('fetchTops – fail, request error', async () => {
		const { analyticsStore } = await factory();

		(getTops as Mock).mockRejectedValueOnce({ status: false })

		expect(analyticsStore.topsLoading).toBe(false)

		const promise = analyticsStore.fetchTops()

		expect(analyticsStore.topsLoading).toBe(true)

		await promise

		expect(analyticsStore.topsLoading).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(getTops).toHaveBeenCalled()
		expect(analyticsStore.tops).toEqual(null)
	})
})
