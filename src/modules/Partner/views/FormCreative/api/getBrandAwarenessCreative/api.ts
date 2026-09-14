import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	IBrandAwarenessCreative,
	IBrandAwarenessCreativeResponse,
} from './types'

export const getBrandAwarenessCreative = (slug: string): Promise<IBrandAwarenessCreative> => {
	return Api.get<IResponseData<IBrandAwarenessCreativeResponse>>(
		'partner/campaigns/brand_awareness/ad/info', { slug }, {
			cache: {
				id: `partner-brand-awareness-creative-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
