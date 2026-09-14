import { vi } from 'vitest'

import type { IResponseMessage } from '@/core/types'
import type { IPaginatedData } from '@/core/types/response'
import type { IHistoryReferral } from '@/modules/Streamer/views/Referrals/api/getHistory'
import { historyData } from '@/modules/Streamer/views/Referrals/api/getHistory/fixtures/historyData'
import { panelsData } from '@/modules/Streamer/views/Referrals/api/getPanels/fixtures/panelsData'
import type { IPanel } from '@/modules/Streamer/views/Referrals/api/getPanels/types'
import type { IReferral } from '@/modules/Streamer/views/Referrals/api/getReferral'
import { referralsData } from '@/modules/Streamer/views/Referrals/api/getReferral/fixtures/referralsData'

export const getReferral = vi.fn(async (): Promise<IReferral> => {
	return new Promise(resolve => resolve(referralsData))
})

export const togglePromotion = vi.fn(async (): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [
			{
				field: null,
				text: 'Saved',
				code: 'STREAMER_REFERRAL_SAVED',
			},
		],
	}))
})

export const sendWidgetPreview = vi.fn(async (): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [
			{
				field: null,
				text: 'Ad request accepted',
				code: 'ADS_SUCCESS_REGISTER',
			},
		],
	}))
})

export const getPanels = vi.fn(async (): Promise<IPanel[]> => {
	return new Promise(resolve => resolve(panelsData))
})

export const getHistory = vi.fn(async (): Promise<IPaginatedData<IHistoryReferral[]>> => {
	return new Promise(resolve => resolve(historyData))
})
