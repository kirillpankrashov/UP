import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	IPrerollCampaignStructure,
	IPrerollCampaignStructureResponse,
} from './types'

export const getPrerollCampaignStructure = (slug: string): Promise<IPrerollCampaignStructure> => {
	return Api.get<IResponseData<IPrerollCampaignStructureResponse>>(
		'partner/campaigns/preroll/structure', { slug }, {
			cache: {
				id: `partner-preroll-campaign-structure-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
