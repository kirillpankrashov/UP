import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { updateBilling } from '@/modules/Partner/views/Agency/api'
import { billing as billingData } from '@/modules/Partner/views/Agency/api/getBilling/fixtures/billing'

import { useBillingStore } from '../billing'

vi.mock('@/core/helpers', () => ({
	Logger: {
		error: vi.fn(),
	},
}))

vi.mock('@/modules/Partner/views/Agency/api')

describe('Billing Store updateData', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('updateData – early return when billing is missing', async () => {
		const store = useBillingStore()

		await store.updateData(billingData)

		expect(updateBilling).not.toHaveBeenCalled()
		expect(store.isFormUpdating).toBe(false)
	})

	it('updateData – early return when isFormUpdating is already true', async () => {
		const store = useBillingStore()
		store.billing = billingData
		store.isFormUpdating = true

		await store.updateData(billingData)

		expect(updateBilling).not.toHaveBeenCalled()
		expect(store.isFormUpdating).toBe(true)
	})

	it('updateData – success, toggles isFormUpdating and calls updateBilling', async () => {
		const store = useBillingStore()
		store.billing = billingData

		const payload = billingData

		;(updateBilling as Mock).mockResolvedValueOnce({} as any)

		const promise = store.updateData(payload)

		expect(store.isFormUpdating).toBe(true)

		await promise

		expect(updateBilling).toHaveBeenCalledWith(payload)
		expect(store.isFormUpdating).toBe(false)
		expect(Logger.error).not.toHaveBeenCalled()
	})

	it('updateData – fail, logs error and resets isFormUpdating', async () => {
		const store = useBillingStore()
		store.billing = billingData

		const error = new Error('Update Billing Error')
		;(updateBilling as Mock).mockRejectedValueOnce(error)

		const promise = store.updateData(billingData)

		expect(store.isFormUpdating).toBe(true)

		await promise

		expect(updateBilling).toHaveBeenCalledWith(billingData)
		expect(Logger.error).toHaveBeenCalledWith(
			'Error updating billing',
			true,
			error,
		)
		expect(store.isFormUpdating).toBe(false)
	})
})

