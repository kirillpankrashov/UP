import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	IPerformanceCampaign,
	IPerformanceCampaignResponse,
} from './types'

export const getPerformanceCampaign = (slug: string): Promise<IPerformanceCampaign> => {
	return Api.get<IResponseData<IPerformanceCampaignResponse>>(
		'partner/campaigns/performance/info', { slug }, {
			cache: {
				id: `partner-performance-campaign-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
