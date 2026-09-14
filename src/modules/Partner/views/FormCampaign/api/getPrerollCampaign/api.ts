import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	IPrerollCampaign,
	IPrerollCampaignResponse,
} from './types'

export const getPrerollCampaign = (slug: string): Promise<IPrerollCampaign> => {
	return Api.get<IResponseData<IPrerollCampaignResponse>>(
		'partner/campaigns/preroll/info', { slug }, {
			cache: {
				id: `partner-preroll-campaign-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
