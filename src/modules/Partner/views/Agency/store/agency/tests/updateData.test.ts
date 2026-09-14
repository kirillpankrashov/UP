import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { getAgency, getReferral, getReferralStreamers, updateAgency } from '@/modules/Partner/views/Agency/api'
import { agency as agencyData } from '@/modules/Partner/views/Agency/api/getAgency/fixtures/agency'

import { useAgencyStore } from '../agency'

vi.mock('@/modules/Partner/views/Agency/api')
vi.mock('@/core/helpers/Logger', () => ({
	Logger: {
		error: vi.fn(),
	},
}))

describe('Agency Store updateData', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('updateData – early return when data is falsy', async () => {
		const agencyStore = useAgencyStore()

		await agencyStore.updateData(null as any)

		expect(updateAgency).not.toHaveBeenCalled()
		expect(agencyStore.isFormUpdating).toBe(false)
	})

	it('updateData – early return when isFormUpdating is already true', async () => {
		const agencyStore = useAgencyStore()

		agencyStore.isFormUpdating = true

		await agencyStore.updateData({
			streamersParticipate: false,
			useDarkMarket: false,
			commission: null,
			cpm: null,
			ignoredCategories: [],
		} as any)

		expect(updateAgency).not.toHaveBeenCalled()
		expect(agencyStore.isFormUpdating).toBe(true)
	})

	it('updateData – success, updates agency and refreshes store', async () => {
		const agencyStore = useAgencyStore()

		const payload = {
			streamersParticipate: true,
			useDarkMarket: true,
			commission: 10,
			cpm: null,
			ignoredCategories: [1, 2],
		} as any

		;(updateAgency as Mock).mockResolvedValueOnce({ status: true })
		;(getAgency as Mock).mockResolvedValueOnce(agencyData)
		;(getReferral as Mock).mockResolvedValueOnce({ link: '', invited: 0, balance: 0, currency: 'rub' })
		;(getReferralStreamers as Mock).mockResolvedValueOnce({
			status: true,
			amount: 0,
			data: [],
		})

		expect(agencyStore.isFormUpdating).toBe(false)

		const promise = agencyStore.updateData(payload)

		expect(agencyStore.isFormUpdating).toBe(true)

		await promise

		expect(updateAgency).toHaveBeenCalledWith(payload)
		expect(getAgency).toHaveBeenCalledTimes(1)
		expect(getReferral).toHaveBeenCalledTimes(1)
		expect(getReferralStreamers).not.toHaveBeenCalled()

		expect(agencyStore.data).toEqual(agencyData)
		expect(agencyStore.isFormUpdating).toBe(false)
	})

	it('updateData – fail, resets isFormUpdating and does not refresh via fetchData', async () => {
		const agencyStore = useAgencyStore()

		const payload = {
			streamersParticipate: true,
			useDarkMarket: true,
			commission: 10,
			cpm: null,
			ignoredCategories: [],
		} as any

		const error = new Error('Update failed')
		;(updateAgency as Mock).mockRejectedValueOnce(error)

		const promise = agencyStore.updateData(payload)

		expect(agencyStore.isFormUpdating).toBe(true)

		await expect(promise).rejects.toThrow('Update failed')

		expect(updateAgency).toHaveBeenCalledWith(payload)
		expect(getAgency).not.toHaveBeenCalled()
		expect(getReferral).not.toHaveBeenCalled()
		expect(getReferralStreamers).not.toHaveBeenCalled()
		expect(agencyStore.isFormUpdating).toBe(false)
		expect(agencyStore.data).toBeNull()
	})
})

