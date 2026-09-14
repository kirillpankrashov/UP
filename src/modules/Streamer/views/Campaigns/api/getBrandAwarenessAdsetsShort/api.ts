import type { IResponseData } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IBrandAwarenessAdsetsShort, IBrandAwarenessAdsetsShortResponse } from './types'

export const getBrandAwarenessAdsetsShort = (): Promise<IBrandAwarenessAdsetsShort> => {
	return Api.get<IResponseData<IBrandAwarenessAdsetsShortResponse>>('streamer/campaigns/brand_awareness/short', undefined, {
		cache: {
			id: 'streamer-brand-awareness-adsets-short',
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res.data))
}
