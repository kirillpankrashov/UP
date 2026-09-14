import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	IPrerollAdset,
	IPrerollAdsetResponse,
} from './types'

export const getPrerollAdset = (slug: string): Promise<IPrerollAdset> => {
	return Api.get<IResponseData<IPrerollAdsetResponse>>(
		'partner/campaigns/preroll/ad-set/info', { slug }, {
			cache: {
				id: `partner-preroll-adset-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
