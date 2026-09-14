import type { IResponseData } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IBrandAwarenessAdsetInfo, IBrandAwarenessAdsetInfoResponse } from './types'

export const getBrandAwarenessAdsetInfo = (slug: string): Promise<IBrandAwarenessAdsetInfo> => {
	return Api.get<IResponseData<IBrandAwarenessAdsetInfoResponse>>(
		'streamer/campaigns/brand_awareness/info', { slug }, {
			cache: {
				id: `streamer-brand-awareness-adset-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
