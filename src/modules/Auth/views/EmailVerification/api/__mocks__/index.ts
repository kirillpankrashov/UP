import { vi } from 'vitest'

import type { IResponseMessage } from '@/core/types'

import type { TEmailVerificationModel } from '../verifyEmail/types'

export const verifyEmail = vi.fn(async (_: TEmailVerificationModel): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [],
	}))
})
