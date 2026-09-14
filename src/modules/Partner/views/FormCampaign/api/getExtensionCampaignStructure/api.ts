import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	IExtensionCampaignStructure,
	IExtensionCampaignStructureResponse,
} from './types'

export const getExtensionCampaignStructure = (slug: string): Promise<IExtensionCampaignStructure> => {
	return Api.get<IResponseData<IExtensionCampaignStructureResponse>>(
		'partner/campaigns/extension/structure', { slug }, {
			cache: {
				id: `partner-extension-campaign-structure-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
