import { vi } from 'vitest'

import type { IResponseMessage } from '@/core/types'

import type { TPartnerSignupModel } from '../partnerSignup/types'

export const partnerSignup = vi.fn(async (_: TPartnerSignupModel): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [],
	}))
})
