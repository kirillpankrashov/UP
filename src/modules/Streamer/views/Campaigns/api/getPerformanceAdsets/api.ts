import type { IResponse } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IPerformanceAdsets, IPerformanceAdsetsResponse } from './types'

export const getPerformanceAdsets = (): Promise<IPerformanceAdsets> => {
	return Api.get<IResponse<IPerformanceAdsetsResponse>>('streamer/campaigns/performance', undefined, {
		cache: {
			id: 'streamer-performance-adsets',
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res))
}
