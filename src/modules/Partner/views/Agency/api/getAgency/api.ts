import type { IResponseData } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IAgency, IAgencyResponse } from './types'

export const getAgency = (): Promise<IAgency> => {
	return Api.get<IResponseData<IAgencyResponse>>('partner/agency', {}, {
		cache: {
			id: 'agency-data',
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res.data))
}
