import type { IResponseData } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IExtensionAdsetsShort, IExtensionAdsetsShortResponse } from './types'

export const getExtensionAdsetsShort = (): Promise<IExtensionAdsetsShort> => {
	return Api.get<IResponseData<IExtensionAdsetsShortResponse>>('streamer/campaigns/extension/short', undefined, {
		cache: {
			id: 'streamer-extension-adsets-short',
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res.data))
}
