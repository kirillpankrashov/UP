import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { getAgency, getReferral, getReferralStreamers } from '@/modules/Partner/views/Agency/api'
import { agency as agencyData } from '@/modules/Partner/views/Agency/api/getAgency/fixtures/agency'
import { referral as referralData } from '@/modules/Partner/views/Agency/api/getReferral/fixtures/referral'
import {
	referralStreamers as referralStreamersData,
} from '@/modules/Partner/views/Agency/api/getReferralStreamers/fixtures/referralStreamers'
import { useAgencyReferralStore } from '@/modules/Partner/views/Agency/store/referral/referral'

import { useAgencyStore } from '../agency'

vi.mock('@/modules/Partner/views/Agency/api')
vi.mock('@/core/helpers/Logger', () => ({
	Logger: {
		error: vi.fn(),
	},
}))

describe('Agency Store fetchData', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('fetchData – success (agency id != 1) calls referral but not referral streamers', async () => {
		const agencyStore = useAgencyStore()
		const referralStore = useAgencyReferralStore()

		;(getAgency as Mock).mockResolvedValueOnce(agencyData)
		;(getReferral as Mock).mockResolvedValueOnce(referralData)
		;(getReferralStreamers as Mock).mockResolvedValueOnce(referralStreamersData)

		expect(agencyStore.data).toBeNull()
		expect(agencyStore.isFetchingData).toBe(false)

		const promise = agencyStore.fetchData()

		expect(agencyStore.isFetchingData).toBe(true)

		await promise

		expect(getAgency).toHaveBeenCalledTimes(1)
		expect(getReferral).toHaveBeenCalledTimes(1)
		expect(getReferralStreamers).not.toHaveBeenCalled()

		expect(referralStore.referral.data).toEqual(referralData)
		expect(agencyStore.data).toEqual(agencyData)
		expect(agencyStore.isFetchingData).toBe(false)
	})

	it('fetchData – success (agency id == 1) calls referral streamers too', async () => {
		const agencyStore = useAgencyStore()
		const referralStore = useAgencyReferralStore()

		const uplifyAgency = { ...agencyData, id: 1 }

		;(getAgency as Mock).mockResolvedValueOnce(uplifyAgency)
		;(getReferral as Mock).mockResolvedValueOnce(referralData)
		;(getReferralStreamers as Mock).mockResolvedValueOnce(referralStreamersData)

		const promise = agencyStore.fetchData()

		expect(agencyStore.isFetchingData).toBe(true)
		await promise

		expect(getAgency).toHaveBeenCalledTimes(1)
		expect(getReferral).toHaveBeenCalledTimes(1)
		expect(getReferralStreamers).toHaveBeenCalledTimes(1)

		expect(referralStore.referral.data).toEqual(referralData)
		expect(referralStore.streamers.data).toEqual(referralStreamersData.data)
		expect(agencyStore.data).toEqual(uplifyAgency)
		expect(agencyStore.isFetchingData).toBe(false)
	})

	it('fetchData – early return when agency is already fetched', async () => {
		const agencyStore = useAgencyStore()
		const referralStore = useAgencyReferralStore()

		agencyStore.data = agencyData

		await agencyStore.fetchData()

		expect(getAgency).not.toHaveBeenCalled()
		expect(getReferral).not.toHaveBeenCalled()
		expect(getReferralStreamers).not.toHaveBeenCalled()

		expect(referralStore.referral.data).toBeNull()
		expect(agencyStore.isFetchingData).toBe(false)
	})

	it('fetchData – fail, resets isFetchingData and does not call referral APIs', async () => {
		const agencyStore = useAgencyStore()

		const error = new Error('API Error')
		;(getAgency as Mock).mockRejectedValueOnce(error)

		const promise = agencyStore.fetchData()

		expect(agencyStore.isFetchingData).toBe(true)

		await expect(promise).rejects.toThrow('API Error')

		expect(getReferral).not.toHaveBeenCalled()
		expect(getReferralStreamers).not.toHaveBeenCalled()
		expect(agencyStore.isFetchingData).toBe(false)
	})
})

