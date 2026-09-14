import { vi } from 'vitest'

import type { IStatus } from '@/core/types'
import { checkListData } from '@/modules/Streamer/views/Dashboard/store/__fixtures__/checkListData'
import { tierData } from '@/modules/Streamer/views/Dashboard/store/__fixtures__/tierData'

import type { TCheckList } from '../getCheckList'
import type { TTier } from '../getTier'

export const closeChecklist = vi.fn(async (): Promise<IStatus> => {
	return new Promise(resolve => resolve({
		status: true,
	}))
})

export const getChecklist = vi.fn(async (): Promise<TCheckList> => {
	return new Promise(resolve => resolve({
		...checkListData,
	}))
})

export const getTier = vi.fn(async (): Promise<TTier> => {
	return new Promise(resolve => resolve({
		...tierData,
	}))
})
