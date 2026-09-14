import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers/Logger'
import { getReferralsHistory } from '@/modules/Partner/views/Agency/api'
import { referralsHistory as referralsHistoryData } from '@/modules/Partner/views/Agency/api/getReferralsHistory/fixtures/referralsHistory'

import { useAgencyReferralStore } from '../referral'

vi.mock('@/modules/Partner/views/Agency/api')
vi.mock('@/core/helpers/Logger', () => ({
	Logger: {
		error: vi.fn(),
	},
}))

describe('Agency Referral Store fetchReferralHistory', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('fetchReferralHistory – success, sets page and appends history items', async () => {
		const store = useAgencyReferralStore()
		const page = 2

		const referralsHistoryWithAmount = {
			...referralsHistoryData,
			amount: 100,
		} as any

		;(getReferralsHistory as Mock).mockResolvedValueOnce(referralsHistoryWithAmount)

		const promise = store.fetchReferralHistory(page)

		expect(store.history.isFetching).toBe(true)

		await promise

		expect(getReferralsHistory).toHaveBeenCalledWith(page)
		expect(store.history.page).toBe(page)
		expect(store.history.amount).toBe(referralsHistoryWithAmount.amount)
		expect(store.history.total).toBe(referralsHistoryWithAmount.total)
		expect(store.history.perPage).toBe(referralsHistoryWithAmount.perPage)
		expect(store.history.data).toEqual(referralsHistoryWithAmount.data)
		expect(store.history.isFetched).toBe(true)
		expect(Logger.error).not.toHaveBeenCalled()
		expect(store.history.isFetching).toBe(false)
	})

	it('fetchReferralHistory – early return when already fetching and no page provided', async () => {
		const store = useAgencyReferralStore()

		store.history.isFetching = true
		store.history.data = [{ date: '2020-01-01', amount: 50 }] as any

		await store.fetchReferralHistory()

		expect(getReferralsHistory).not.toHaveBeenCalled()
		expect(store.history.isFetching).toBe(true)
		expect(store.history.data).toHaveLength(1)
	})

	it('fetchReferralHistory – fail, logs error and keeps history as not fetched', async () => {
		const store = useAgencyReferralStore()
		const page = 1
		const error = new Error('History API Error')

		;(getReferralsHistory as Mock).mockRejectedValueOnce(error)

		const promise = store.fetchReferralHistory(page)

		expect(store.history.isFetching).toBe(true)

		await promise

		expect(Logger.error).toHaveBeenCalledWith(
			'Error fetching referral history',
			true,
			error,
		)
		expect(store.history.isFetched).toBe(false)
		expect(store.history.data).toEqual([])
		expect(store.history.isFetching).toBe(false)
	})
})

