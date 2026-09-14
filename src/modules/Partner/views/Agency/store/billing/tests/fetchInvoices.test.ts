import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { getBilling, getInvoices } from '@/modules/Partner/views/Agency/api'
import { invoices as invoicesData } from '@/modules/Partner/views/Agency/api/getInvoices/fixtures/invoices'

import { useBillingStore } from '../billing'

vi.mock('@/core/helpers', () => ({
	Logger: {
		error: vi.fn(),
	},
}))

vi.mock('@/modules/Partner/views/Agency/api')

describe('Billing Store fetchInvoices', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('fetchInvoices – success, sets invoices and loading flags', async () => {
		const store = useBillingStore()
		const page = 2

		;(getInvoices as Mock).mockResolvedValueOnce(invoicesData)

		expect(store.invoices.loading).toBe(false)
		expect(store.invoices.isFetched).toBe(false)

		const promise = store.fetchInvoices(page)

		expect(store.invoices.loading).toBe(true)

		await promise

		expect(getInvoices).toHaveBeenCalledWith(page)

		expect(store.invoices.data).toEqual(invoicesData.data)
		expect(store.invoices.total).toBe(invoicesData.total)
		expect(store.invoices.perPage).toBe(invoicesData.perPage)
		expect(store.invoices.page).toBe(page)
		expect(store.invoices.isFetched).toBe(true)
		expect(store.invoices.loading).toBe(false)
		expect(Logger.error).not.toHaveBeenCalled()
	})

	it('fetchInvoices – fail, logs error and keeps previous invoices state', async () => {
		const store = useBillingStore()
		const page = 3
		const error = new Error('Invoices API Error')

		// Ensure billing fetch doesn't accidentally happen from this action
		;(getBilling as Mock).mockResolvedValueOnce({} as any)

		;(getInvoices as Mock).mockRejectedValueOnce(error)

		const promise = store.fetchInvoices(page)

		expect(store.invoices.loading).toBe(true)

		await promise

		expect(Logger.error).toHaveBeenCalledWith(
			'Error fetching invoices',
			true,
			error,
		)

		expect(store.invoices.loading).toBe(false)
		expect(store.invoices.isFetched).toBe(false)
		expect(store.invoices.data).toEqual([])
		expect(store.invoices.page).toBe(0)
		expect(getInvoices).toHaveBeenCalledWith(page)
		expect(getBilling).not.toHaveBeenCalled()
	})
})

