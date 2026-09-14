import type { IResponseData } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IPrerollAdsets, IPrerollAdsetsResponse } from './types'

export const getPrerollAdsets = (): Promise<IPrerollAdsets> => {
	return Api.get<IResponseData<IPrerollAdsetsResponse>>('streamer/campaigns/preroll', undefined, {
		cache: {
			id: 'streamer-preroll-adsets',
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res.data))
}
