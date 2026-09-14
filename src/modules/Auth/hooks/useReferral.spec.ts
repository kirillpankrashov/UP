import { beforeEach, describe, expect, it } from 'vitest'

import { useReferral } from './useReferral'

describe('useReferral', () => {
	beforeEach(() => {
		localStorage.clear()
	})

	it('creates and returns referral correctly', () => {
		const { getReferral, setReferral } = useReferral()

		setReferral('token', 'partnerId')

		const referral = getReferral()

		expect(referral).toEqual({
			createdAt: expect.any(Number),
			value: 'token',
			partnerId: 'partnerId',
		})
	})

	it('removes expired referral', () => {
		localStorage.setItem('referral', JSON.stringify({
			createdAt: new Date().getTime() - (1000 * 60 * 60 * 24 * 8), // 8 days ago
			value: 'expiredToken',
		}))

		const { getReferral } = useReferral()

		const referral = getReferral()

		expect(referral).toBeNull()
	})
})
