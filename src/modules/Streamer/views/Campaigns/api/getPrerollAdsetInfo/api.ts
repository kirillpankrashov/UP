import type { IResponseData } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IPrerollAdsetInfo, IPrerollAdsetInfoResponse } from './types'

export const getPrerollAdsetInfo = (slug: string): Promise<IPrerollAdsetInfo> => {
	return Api.get<IResponseData<IPrerollAdsetInfoResponse>>(
		'streamer/campaigns/preroll/info', { slug }, {
			cache: {
				id: `streamer-preroll-adset-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
