import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { togglePromotion } from '@/modules/Streamer/views/Referrals/api'

import { useReferralsStore } from '../referrals'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Referrals/api')

describe('Settings Store togglePromotion', () => {
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

	it('togglePromotion – success', async () => {
		const { refeferralsStore } = await factory(true)

		expect(refeferralsStore.promotion.sending).toBe(false)
		expect(refeferralsStore.promotion.success).toBe(false)

		const promise = refeferralsStore.togglePromotion(true)

		expect(refeferralsStore.promotion.sending).toBe(true)
		expect(refeferralsStore.promotion.success).toBe(false)

		await promise

		expect(refeferralsStore.promotion.success).toBe(true)

		vi.runAllTimers()

		expect(togglePromotion).toHaveBeenCalled()

		expect(refeferralsStore.promotion.sending).toBe(false)
		expect(refeferralsStore.promotion.success).toBe(false)
	})

	it('togglePromotion – fail', async () => {
		const { refeferralsStore } = await factory(false)

		expect(refeferralsStore.promotion.sending).toBe(false)
		expect(refeferralsStore.promotion.success).toBe(false)

		refeferralsStore.togglePromotion(true)

		expect(refeferralsStore.promotion.sending).toBe(false)
		expect(refeferralsStore.promotion.success).toBe(false)

		expect(Logger.error).toBeCalled()
	})

	it('togglePromotion – fail', async () => {
		const { refeferralsStore } = await factory();

		(togglePromotion as Mock).mockRejectedValueOnce({ status: false })

		expect(refeferralsStore.promotion.sending).toBe(false)
		expect(refeferralsStore.promotion.success).toBe(false)

		const promise = refeferralsStore.togglePromotion(true)

		expect(refeferralsStore.promotion.sending).toBe(true)
		expect(refeferralsStore.promotion.success).toBe(false)

		await promise

		expect(refeferralsStore.promotion.success).toBe(false)

		vi.runAllTimers()

		expect(togglePromotion).toHaveBeenCalled()

		expect(refeferralsStore.promotion.sending).toBe(false)
		expect(refeferralsStore.promotion.success).toBe(false)
	})
})
