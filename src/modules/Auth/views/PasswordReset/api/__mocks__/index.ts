import { vi } from 'vitest'

import type { IResponseMessage } from '@/core/types'

import type { TRequestNewPasswordModel } from '../requestNewPassword/types'

export const requestNewPassword = vi.fn(async (_: TRequestNewPasswordModel): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [],
	}))
})
