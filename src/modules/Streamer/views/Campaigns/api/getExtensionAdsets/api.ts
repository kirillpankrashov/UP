import type { IResponse } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IExtensionAdsets, IExtensionAdsetsResponse } from './types'

export const getExtensionAdsets = (): Promise<IExtensionAdsets> => {
	return Api.get<IResponse<IExtensionAdsetsResponse>>('streamer/campaigns/extension', undefined, {
		cache: {
			id: 'streamer-extension-adsets',
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res))
}
