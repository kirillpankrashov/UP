import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IReferralHistoryDetail, IReferralHistoryDetailResponse } from './types'

export const getReferralsHistoryDetail = (date: string): Promise<IPaginatedData<IReferralHistoryDetail[]>> => {
	return Api.get<IResponsePaginatedData<IReferralHistoryDetailResponse[]>>('partner/referral/history/detail', { date }, {
		cache: {
			id: `agency-referrals-history-detail-${date}`,
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res))
}
