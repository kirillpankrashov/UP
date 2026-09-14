import { vi } from 'vitest'

import type { IResponseMessage } from '@/core/types'

import type { TProfileModel } from '../api/updateProfile/types'

export const updateProfile = vi.fn(async (_: TProfileModel): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [],
	}))
})
