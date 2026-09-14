import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { getTransactions } from '@/modules/Streamer/views/Wallet/api'
import { transactionsData } from '@/modules/Streamer/views/Wallet/api/getTransactions/fixtures/transactionsData'

import { useTransactionsStore } from '../transactions'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Wallet/api')

describe('Settings Wallet Transactions fetchTransactions', () => {
	beforeEach(() => {
		vi.useFakeTimers()
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (fetchTransactions: boolean = true) => {
		const transactionsStore = useTransactionsStore()
		if (fetchTransactions) {
			await transactionsStore.fetchTransactions()
		}

		return { transactionsStore }
	}

	it('fetchTransactions – success', async () => {
		const { transactionsStore } = await factory(false)

		expect(transactionsStore.isFetching).toBe(false)

		const promise = transactionsStore.fetchTransactions()

		expect(transactionsStore.isFetching).toBe(true)

		await promise

		expect(transactionsStore.isFetching).toBe(false)

		expect(getTransactions).toHaveBeenCalled()
		expect(transactionsStore.payoutStatus).toEqual(transactionsData.data.payoutStatus)
		expect(transactionsStore.transactions.data).toEqual(transactionsData.data.transactions)
	})

	it('fetchTransactions – fail', async () => {
		const { transactionsStore } = await factory(false);

		(getTransactions as Mock).mockRejectedValueOnce({ status: false })

		expect(transactionsStore.isFetching).toBe(false)

		const promise = transactionsStore.fetchTransactions()

		expect(transactionsStore.isFetching).toBe(true)

		await promise

		expect(transactionsStore.isFetching).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(getTransactions).toHaveBeenCalled()
		expect(transactionsStore.payoutStatus).toEqual(null)
		expect(transactionsStore.transactions).toEqual({
			data: [],
			perPage: 0,
			total: 0,
			page: 1,
		})
	})
})
