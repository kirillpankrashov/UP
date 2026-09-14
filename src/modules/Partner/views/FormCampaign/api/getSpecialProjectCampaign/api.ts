import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	ISpecialProjectCampaign,
	ISpecialProjectCampaignResponse,
} from './types'

export const getSpecialProjectCampaign = (slug: string): Promise<ISpecialProjectCampaign> => {
	return Api.get<IResponseData<ISpecialProjectCampaignResponse>>(
		'partner/campaigns/special_project/info', { slug }, {
			cache: {
				id: `partner-special-project-campaign-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
