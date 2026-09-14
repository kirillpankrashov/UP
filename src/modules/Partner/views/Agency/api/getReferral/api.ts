import type { IResponseData } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import type { IReferral } from './types'

export const getReferral = (): Promise<IReferral> => {
	return Api.get<IResponseData<IReferral>>('partner/referral', {}, {
		cache: {
			id: 'agency-referral-data',
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => res.data)
}
