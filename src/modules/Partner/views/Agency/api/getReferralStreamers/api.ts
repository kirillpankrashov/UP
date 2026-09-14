import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IReferralStreamer, IReferralStreamerResponse } from './types'

export const getReferralStreamers = (): Promise<IResponseData<IReferralStreamer[]> & { amount: number }> => {
	return Api.get<IResponseData<IReferralStreamerResponse[]> & { amount: number }>('partner/referral/creators', {}, {
		cache: {
			id: 'agency-referral-streamers-data',
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res))
}
