import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	ISpecialProjectCampaignStructure,
	ISpecialProjectCampaignStructureResponse,
} from './types'

export const getSpecialProjectCampaignStructure = (slug: string): Promise<ISpecialProjectCampaignStructure> => {
	return Api.get<IResponseData<ISpecialProjectCampaignStructureResponse>>(
		'partner/campaigns/special_project/structure', { slug }, {
			cache: {
				id: `partner-special-project-campaign-structure-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
