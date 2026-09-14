import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api } from '@/core/client'

import { responseToData } from './adapter'
import type { IHistoryReferral, IHistoryReferralResponse } from './types'

export const getHistory = (page: number): Promise<IPaginatedData<IHistoryReferral[]>> => {
	return Api.get<IResponsePaginatedData<IHistoryReferralResponse[]>>(
		'streamer/referral/history', { page },
	).then((res) => responseToData(res))
}
