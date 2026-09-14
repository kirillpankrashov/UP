import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers/Logger'
import { getReferral } from '@/modules/Partner/views/Agency/api'
import { referral as referralData } from '@/modules/Partner/views/Agency/api/getReferral/fixtures/referral'

import { useAgencyReferralStore } from '../referral'

vi.mock('@/modules/Partner/views/Agency/api')
vi.mock('@/core/helpers/Logger', () => ({
	Logger: {
		error: vi.fn(),
	},
}))

describe('Agency Referral Store fetchReferral', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('fetchReferral – success, sets referral.data and toggles referral.isFetching', async () => {
		const store = useAgencyReferralStore()

		expect(store.referral.data).toBeNull()
		expect(store.referral.isFetching).toBe(false)

		;(getReferral as Mock).mockResolvedValueOnce(referralData)

		const promise = store.fetchReferral()

		expect(store.referral.isFetching).toBe(true)

		await promise

		expect(getReferral).toHaveBeenCalledTimes(1)
		expect(store.referral.data).toEqual(referralData)
		expect(Logger.error).not.toHaveBeenCalled()
		expect(store.referral.isFetching).toBe(false)
	})

	it('fetchReferral – early return when request is already in progress', async () => {
		const store = useAgencyReferralStore()

		store.referral.isFetching = true

		await store.fetchReferral()

		expect(getReferral).not.toHaveBeenCalled()
		expect(store.referral.isFetching).toBe(true)
	})

	it('fetchReferral – fail, logs error and keeps referral.data null', async () => {
		const store = useAgencyReferralStore()
		const error = new Error('Referral API Error')

		;(getReferral as Mock).mockRejectedValueOnce(error)

		const promise = store.fetchReferral()

		expect(store.referral.isFetching).toBe(true)

		await promise

		expect(Logger.error).toHaveBeenCalledWith(
			'Error fetching referral',
			true,
			error,
		)
		expect(store.referral.data).toBeNull()
		expect(store.referral.isFetching).toBe(false)
	})
})

