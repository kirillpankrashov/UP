import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IReferralHistoryItem } from './types'

export const getReferralsHistory = (page: number): Promise<IPaginatedData<IReferralHistoryItem[]> & { amount: number }> => {
	return Api.get<IResponsePaginatedData<IReferralHistoryItem[]> & { amount: number }>('partner/referral/history', { page }, {
		cache: {
			id: `agency-referrals-history-${JSON.stringify({ page })}`,
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res))
}
