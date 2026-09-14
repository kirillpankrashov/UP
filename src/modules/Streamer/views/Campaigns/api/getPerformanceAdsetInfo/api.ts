import type { IResponseData } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IPerformanceAdsetInfo, IPerformanceAdsetInfoResponse } from './types'

export const getPerformanceAdsetInfo = (slug: string): Promise<IPerformanceAdsetInfo> => {
	return Api.get<IResponseData<IPerformanceAdsetInfoResponse>>(
		'streamer/campaigns/performance/info', { slug }, {
			cache: {
				id: `streamer-performance-adset-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
