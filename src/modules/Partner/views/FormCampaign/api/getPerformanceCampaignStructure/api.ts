import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	IPerformanceCampaignStructure,
	IPerformanceCampaignStructureResponse,
} from './types'

export const getPerformanceCampaignStructure = (slug: string): Promise<IPerformanceCampaignStructure> => {
	return Api.get<IResponseData<IPerformanceCampaignStructureResponse>>(
		'partner/campaigns/performance/structure', { slug }, {
			cache: {
				id: `partner-performance-campaign-structure-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
