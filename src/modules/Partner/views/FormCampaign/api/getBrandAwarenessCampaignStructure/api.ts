import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	IBrandAwarenessCampaignStructure,
	IBrandAwarenessCampaignStructureResponse,
} from './types'

export const getBrandAwarenessCampaignStructure = (slug: string): Promise<IBrandAwarenessCampaignStructure> => {
	return Api.get<IResponseData<IBrandAwarenessCampaignStructureResponse>>(
		'partner/campaigns/brand_awareness/structure', { slug }, {
			cache: {
				id: `partner-brand-awareness-campaign-structure-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
