import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers/Logger'
import { getReferralsHistoryDetail } from '@/modules/Partner/views/Agency/api'
import { referralsHistoryDetail as referralsHistoryDetailData } from '@/modules/Partner/views/Agency/api/getReferralsHistoryDetail/fixtures/referralsHistoryDetail'

import { useAgencyReferralStore } from '../referral'

vi.mock('@/modules/Partner/views/Agency/api')
vi.mock('@/core/helpers/Logger', () => ({
	Logger: {
		error: vi.fn(),
	},
}))

describe('Agency Referral Store fetchReferralHistoryDetail', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('fetchReferralHistoryDetail – success, sets data and toggles loading', async () => {
		const store = useAgencyReferralStore()
		const date = '2024-01-01'

		;(getReferralsHistoryDetail as Mock).mockResolvedValueOnce(referralsHistoryDetailData)

		expect(store.historyDetail.isFetching).toBe(false)

		const promise = store.fetchReferralHistoryDetail(date)

		expect(store.historyDetail.isFetching).toBe(true)

		await promise

		expect(getReferralsHistoryDetail).toHaveBeenCalledWith(date)
		expect(store.historyDetail.data).toEqual(referralsHistoryDetailData.data)
		expect(store.historyDetail.isFetched).toBe(true)
		expect(store.historyDetail.perPage).toBe(referralsHistoryDetailData.perPage)
		expect(store.historyDetail.total).toBe(referralsHistoryDetailData.total)
		expect(Logger.error).not.toHaveBeenCalled()
		expect(store.historyDetail.isFetching).toBe(false)
	})

	it('fetchReferralHistoryDetail – fail, logs error and toggles loading off', async () => {
		const store = useAgencyReferralStore()
		const date = '2024-01-01'
		const error = new Error('History Detail API Error')

		;(getReferralsHistoryDetail as Mock).mockRejectedValueOnce(error)

		const promise = store.fetchReferralHistoryDetail(date)

		expect(store.historyDetail.isFetching).toBe(true)

		await promise

		expect(Logger.error).toHaveBeenCalledWith(
			'Error fetching referral history detail',
			true,
			error,
		)
		expect(store.historyDetail.isFetched).toBe(false)
		expect(store.historyDetail.data).toEqual([])
		expect(store.historyDetail.isFetching).toBe(false)
	})
})

