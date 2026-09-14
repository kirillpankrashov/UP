import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	IExtensionCampaign,
	IExtensionCampaignResponse,
} from './types'

export const getExtensionCampaign = (slug: string): Promise<IExtensionCampaign> => {
	return Api.get<IResponseData<IExtensionCampaignResponse>>(
		'partner/campaigns/extension/info', { slug }, {
			cache: {
				id: `partner-extension-campaign-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
