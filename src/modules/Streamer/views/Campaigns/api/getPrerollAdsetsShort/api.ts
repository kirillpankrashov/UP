import type { IResponseData } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IPrerollAdsetsShort, IPrerollAdsetsShortResponse } from './types'

export const getPrerollAdsetsShort = (): Promise<IPrerollAdsetsShort> => {
	return Api.get<IResponseData<IPrerollAdsetsShortResponse>>('streamer/campaigns/preroll/short', undefined, {
		cache: {
			id: 'streamer-preroll-adsets-short',
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res.data))
}
