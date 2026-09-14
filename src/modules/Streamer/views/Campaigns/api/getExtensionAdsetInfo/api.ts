import type { IResponseData } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IExtensionAdsetInfo, IExtensionAdsetInfoResponse } from './types'

export const getExtensionAdsetInfo = (slug: string): Promise<IExtensionAdsetInfo> => {
	return Api.get<IResponseData<IExtensionAdsetInfoResponse>>(
		'streamer/campaigns/extension/info', { slug }, {
			cache: {
				id: `streamer-extension-adset-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
