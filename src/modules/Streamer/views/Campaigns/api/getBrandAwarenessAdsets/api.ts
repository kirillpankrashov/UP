import type { IResponse } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IBrandAwarenessAdsets, IBrandAwarenessAdsetsResponse } from './types'

export const getBrandAwarenessAdsets = (): Promise<IBrandAwarenessAdsets> => {
	return Api.get<IResponse<IBrandAwarenessAdsetsResponse>>('streamer/campaigns/brand_awareness', undefined, {
		cache: {
			id: 'streamer-brand-awareness-adsets',
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res))
}
