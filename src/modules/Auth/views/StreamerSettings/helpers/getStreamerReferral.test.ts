import { describe, expect, it, vi } from 'vitest'

import { getStreamerReferral } from './getStreamerReferral'

describe('getStreamerReferral', () => {
	it('returns an empty object if referral is not available', () => {
		const getReferral = vi.fn().mockReturnValue(null)
		const result = getStreamerReferral(getReferral)
		expect(result).toEqual({})
		expect(getReferral).toHaveBeenCalledTimes(1)
	})

	it('returns the referral value if available', () => {
		const referralValue = 'your-referral-value'
		const getReferral = vi.fn().mockReturnValue({ value: referralValue })
		const result = getStreamerReferral(getReferral)
		expect(result).toEqual({ referral: referralValue })
		expect(getReferral).toHaveBeenCalledTimes(1)
	})
})
