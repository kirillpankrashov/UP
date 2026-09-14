import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CurrencyIcon } from '@/core/types'
import { agency as agencyData } from '@/modules/Partner/views/Agency/api/getAgency/fixtures/agency'

import { useAgencyStore } from '../agency'

vi.mock('@/modules/Partner/views/Agency/api')
vi.mock('@/core/helpers/Logger', () => ({
	Logger: {
		error: vi.fn(),
	},
}))

describe('Agency Store getters', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})

	it('isUplifyAgency – returns false when id != 1', () => {
		const agencyStore = useAgencyStore()
		agencyStore.data = agencyData

		expect(agencyStore.isUplifyAgency).toBe(false)
	})

	it('isUplifyAgency – returns true when id == 1', () => {
		const agencyStore = useAgencyStore()
		agencyStore.data = { ...agencyData, id: 1 }

		expect(agencyStore.isUplifyAgency).toBe(true)
	})

	it('currencySign – returns symbol for USD and null when data is missing', () => {
		const agencyStore = useAgencyStore()

		expect(agencyStore.currencySign).toBeNull()

		agencyStore.data = agencyData
		expect(agencyStore.currencySign).toBe(CurrencyIcon.USD)
	})
})

