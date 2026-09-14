import type { IResponseData } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IPerformanceAdsetsShort, IPerformanceAdsetsShortResponse } from './types'

export const getPerformanceAdsetsShort = (): Promise<IPerformanceAdsetsShort> => {
	return Api.get<IResponseData<IPerformanceAdsetsShortResponse>>('streamer/campaigns/performance/short', undefined, {
		cache: {
			id: 'streamer-performance-adsets-short',
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res.data))
}
