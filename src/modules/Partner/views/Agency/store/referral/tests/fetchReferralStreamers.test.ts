import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers/Logger'
import { getReferralStreamers } from '@/modules/Partner/views/Agency/api'
import { referralStreamers as referralStreamersData } from '@/modules/Partner/views/Agency/api/getReferralStreamers/fixtures/referralStreamers'

import { useAgencyReferralStore } from '../referral'

vi.mock('@/modules/Partner/views/Agency/api')
vi.mock('@/core/helpers/Logger', () => ({
	Logger: {
		error: vi.fn(),
	},
}))

describe('Agency Referral Store fetchReferralStreamers', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('fetchReferralStreamers – success, sets streamers and isFetched', async () => {
		const store = useAgencyReferralStore()

		expect(store.streamers.isFetched).toBe(false)

		;(getReferralStreamers as Mock).mockResolvedValueOnce(referralStreamersData)

		const promise = store.fetchReferralStreamers()

		expect(store.streamers.isFetching).toBe(true)

		await promise

		expect(getReferralStreamers).toHaveBeenCalledTimes(1)
		expect(store.streamers.isFetched).toBe(true)
		expect(store.streamers.amount).toBe(referralStreamersData.amount)
		expect(store.streamers.data).toEqual(referralStreamersData.data)
		expect(Logger.error).not.toHaveBeenCalled()
		expect(store.streamers.isFetching).toBe(false)
	})

	it('fetchReferralStreamers – early return when request is already in progress', async () => {
		const store = useAgencyReferralStore()

		store.streamers.isFetching = true

		await store.fetchReferralStreamers()

		expect(getReferralStreamers).not.toHaveBeenCalled()
		expect(store.streamers.isFetching).toBe(true)
	})

	it('fetchReferralStreamers – fail, logs error and keeps streamers un-fetched', async () => {
		const store = useAgencyReferralStore()
		const error = new Error('Streamers API Error')

		;(getReferralStreamers as Mock).mockRejectedValueOnce(error)

		const promise = store.fetchReferralStreamers()

		expect(store.streamers.isFetching).toBe(true)

		await promise

		expect(Logger.error).toHaveBeenCalledWith(
			'Error fetching referral streamers',
			true,
			error,
		)
		expect(store.streamers.isFetched).toBe(false)
		expect(store.streamers.amount).toBe(0)
		expect(store.streamers.data).toEqual([])
		expect(store.streamers.isFetching).toBe(false)
	})
})

