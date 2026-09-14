import { vi } from 'vitest'

import type { IResponseMessage } from '@/core/types'

import type { TResetPasswordModel } from '../resetPassword/types'

export const resetPassword = vi.fn(async (_: TResetPasswordModel): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [],
	}))
})
