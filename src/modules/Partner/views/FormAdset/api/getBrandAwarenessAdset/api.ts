import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	IBrandAwarenessAdset,
	IBrandAwarenessAdsetResponse,
} from './types'

export const getBrandAwarenessAdset = (slug: string): Promise<IBrandAwarenessAdset> => {
	return Api.get<IResponseData<IBrandAwarenessAdsetResponse>>(
		'partner/campaigns/brand_awareness/ad-set/info', { slug }, {
			cache: {
				id: `partner-brand-awareness-adset-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		})
		.then(res => responseToData(res.data))
}
