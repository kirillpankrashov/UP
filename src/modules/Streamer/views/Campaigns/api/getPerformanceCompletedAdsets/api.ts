import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IPerformanceCompletedAdset, IPerformanceCompletedAdsetResponse } from './types'

export const getPerformanceCompletedAdsets = (page: number): Promise<IPaginatedData<IPerformanceCompletedAdset[]>> => {
	return Api.get<IResponsePaginatedData<IPerformanceCompletedAdsetResponse[]>>(
		'streamer/campaigns/performance/closed', { page }, {
			cache: {
				id: `streamer-performance-completed-adsets-${page}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res))
}
