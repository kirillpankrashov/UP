import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IBrandAwarenessCompletedAdset, IBrandAwarenessCompletedAdsetResponse } from './types'

export const getBrandAwarenessCompletedAdsets = (page: number): Promise<IPaginatedData<IBrandAwarenessCompletedAdset[]>> => {
	return Api.get<IResponsePaginatedData<IBrandAwarenessCompletedAdsetResponse[]>>(
		'streamer/campaigns/brand_awareness/closed', { page }, {
			cache: {
				id: `streamer-brand-awareness-completed-adsets-${page}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res))
}
