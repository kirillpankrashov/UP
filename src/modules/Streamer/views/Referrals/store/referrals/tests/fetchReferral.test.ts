import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { getReferral } from '@/modules/Streamer/views/Referrals/api'
import { referralsData } from '@/modules/Streamer/views/Referrals/api/getReferral/fixtures/referralsData'

import { useReferralsStore } from '../referrals'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Referrals/api')

describe('Settings Store fetchReferral', () => {
	beforeEach(() => {
		vi.useFakeTimers()
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (fetchReferral: boolean = true) => {
		const refeferralsStore = useReferralsStore()
		if (fetchReferral) {
			await refeferralsStore.fetchReferral()
		}

		return { refeferralsStore }
	}

	it('fetchReferral – success', async () => {
		const { refeferralsStore } = await factory(false)

		expect(refeferralsStore.isFetchingRefferal).toBe(false)

		const promise = refeferralsStore.fetchReferral()

		expect(refeferralsStore.isFetchingRefferal).toBe(true)

		await promise

		vi.runAllTimers()

		expect(refeferralsStore.isFetchingRefferal).toBe(false)

		expect(getReferral).toHaveBeenCalled()
		expect(refeferralsStore.referral).toEqual(referralsData)
	})

	it('fetchReferral – fail', async () => {
		const { refeferralsStore } = await factory(false);

		(getReferral as Mock).mockRejectedValueOnce({ status: false })

		expect(refeferralsStore.isFetchingRefferal).toBe(false)

		const promise = refeferralsStore.fetchReferral()

		expect(refeferralsStore.isFetchingRefferal).toBe(true)

		await promise

		vi.runAllTimers()

		expect(refeferralsStore.isFetchingRefferal).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(getReferral).toHaveBeenCalled()
		expect(refeferralsStore.referral).toEqual(null)
	})
})
