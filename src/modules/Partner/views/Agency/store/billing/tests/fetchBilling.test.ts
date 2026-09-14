import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { getBilling } from '@/modules/Partner/views/Agency/api'
import { billing as billingData } from '@/modules/Partner/views/Agency/api/getBilling/fixtures/billing'

import { useBillingStore } from '../billing'

vi.mock('@/core/helpers', () => ({
	Logger: {
		error: vi.fn(),
	},
}))

vi.mock('@/modules/Partner/views/Agency/api')

describe('Billing Store fetchBilling', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('fetchBilling – success, sets billing and toggles isFetchingData', async () => {
		const store = useBillingStore()

		expect(store.billing).toBeNull()
		expect(store.isFetchingData).toBe(false)

		;(getBilling as Mock).mockResolvedValueOnce(billingData)

		const promise = store.fetchBilling()

		expect(store.isFetchingData).toBe(true)

		await promise

		expect(getBilling).toHaveBeenCalledTimes(1)
		expect(store.billing).toEqual(billingData)
		expect(store.isFetchingData).toBe(false)
		expect(Logger.error).not.toHaveBeenCalled()
	})

	it('fetchBilling – early return when billing already exists', async () => {
		const store = useBillingStore()
		store.billing = billingData

		await store.fetchBilling()

		expect(getBilling).not.toHaveBeenCalled()
		expect(store.isFetchingData).toBe(false)
	})

	it('fetchBilling – fail, logs error and keeps billing null', async () => {
		const store = useBillingStore()
		const error = new Error('Billing API Error')

		;(getBilling as Mock).mockRejectedValueOnce(error)

		const promise = store.fetchBilling()

		expect(store.isFetchingData).toBe(true)

		await promise

		expect(Logger.error).toHaveBeenCalledWith(
			'Error fetching billing',
			true,
			error,
		)
		expect(store.billing).toBeNull()
		expect(store.isFetchingData).toBe(false)
	})
})

