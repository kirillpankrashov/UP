import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	IPerformanceAdset,
	IPerformanceAdsetResponse,
} from './types'

export const getPerformanceAdset = (slug: string): Promise<IPerformanceAdset> => {
	return Api.get<IResponseData<IPerformanceAdsetResponse>>(
		'partner/campaigns/performance/ad-set/info', { slug }, {
			cache: {
				id: `partner-performance-adset-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
