import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { getHistory } from '@/modules/Streamer/views/Referrals/api'
import { historyData } from '@/modules/Streamer/views/Referrals/api/getHistory/fixtures/historyData'

import { useReferralsHistoryStore } from '../referralsHistory'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Referrals/api')

describe('Settings Referrals History fetchHistory', () => {
	beforeEach(() => {
		vi.useFakeTimers()
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (fetchHistory: boolean = true) => {
		const transactionsStore = useReferralsHistoryStore()
		if (fetchHistory) {
			await transactionsStore.fetchHistory()
		}

		return { transactionsStore }
	}

	it('fetchHistory – success', async () => {
		const { transactionsStore } = await factory(false)

		expect(transactionsStore.isFetching).toBe(false)

		const promise = transactionsStore.fetchHistory()

		expect(transactionsStore.isFetching).toBe(true)

		await promise

		expect(transactionsStore.isFetching).toBe(false)

		expect(getHistory).toHaveBeenCalled()

		expect(transactionsStore.history.data).toEqual(historyData.data)
		expect(transactionsStore.history.perPage).toEqual(historyData.perPage)
		expect(transactionsStore.history.total).toEqual(historyData.total)
	})

	it('fetchHistory – fail', async () => {
		const { transactionsStore } = await factory(false);

		(getHistory as Mock).mockRejectedValueOnce({ status: false })

		expect(transactionsStore.isFetching).toBe(false)

		const promise = transactionsStore.fetchHistory()

		expect(transactionsStore.isFetching).toBe(true)

		await promise

		expect(transactionsStore.isFetching).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(getHistory).toHaveBeenCalled()

		expect(transactionsStore.history).toEqual({
			data: [],
			perPage: 0,
			total: 0,
			page: 1,
		})
	})
})
