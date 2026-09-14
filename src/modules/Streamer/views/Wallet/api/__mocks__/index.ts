import { vi } from 'vitest'

import type { IStreamerWallet, PayoutService } from '@/core/types'
import type { IPaginatedData, IResponseMessage } from '@/core/types/response'

import type { IWalletAnalyticsDay } from '../getAnalytics'
import { analyticsData } from '../getAnalytics/fixtures/analyticsData'
import type { ITransactions } from '../getTransactions'
import { transactionsData } from '../getTransactions/fixtures/transactionsData'
import { walletDataTipalti } from '../getWallet/fixtures/walletData'

export const getWallet = vi.fn(async (): Promise<IStreamerWallet> => {
	return new Promise(resolve => resolve(walletDataTipalti))
})

export const getAnalytics = vi.fn(async (): Promise<IWalletAnalyticsDay[]> => {
	return new Promise(resolve => resolve(analyticsData))
})

export const getTransactions = vi.fn(async (): Promise<IPaginatedData<ITransactions>> => {
	return new Promise(resolve => resolve(transactionsData))
})

export const savePayoutMethod = vi.fn(async (method: PayoutService): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		'messages': [
			{
				'field': null,
				'text': `Data for ${method} service saved`,
				'code': `PAYMENT_METHOD_${method}_SAVED`,
			},
		],
	}))
})
