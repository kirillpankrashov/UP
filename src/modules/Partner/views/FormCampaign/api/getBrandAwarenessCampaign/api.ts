import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	IBrandAwarenessCampaign,
	IBrandAwarenessCampaignResponse,
} from './types'

export const getBrandAwarenessCampaign = (slug: string): Promise<IBrandAwarenessCampaign> => {
	return Api.get<IResponseData<IBrandAwarenessCampaignResponse>>(
		'partner/campaigns/brand_awareness/info', { slug }, {
			cache: {
				id: `partner-brand-awareness-campaign-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
