import type { IResponseData } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IBilling, IBillingResponse } from './types'

export const getBilling = (): Promise<IBilling> => {
	return Api.get<IResponseData<IBillingResponse>>('partner/agency/billing', {}, {
		cache: {
			id: 'agency-billing-data',
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res.data))
}
