import type { IResponseData } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { ISpecialProjectAdsetInfo, ISpecialProjectAdsetInfoResponse } from './types'

export const getSpecialProjectAdsetInfo = (slug: string): Promise<ISpecialProjectAdsetInfo> => {
	return Api.get<IResponseData<ISpecialProjectAdsetInfoResponse>>(
		'streamer/campaigns/special_project/info', { slug }, {
			cache: {
				id: `streamer-special-project-adset-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
