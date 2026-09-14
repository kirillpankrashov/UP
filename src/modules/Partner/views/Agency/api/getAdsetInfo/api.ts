import type { CampaignType, IResponseData } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IAdsetInfo, IAdsetInfoResponse } from './types'

export const getAdsetInfo = (slug: string, campaignType: CampaignType): Promise<IAdsetInfo> => {
	return Api
		.get<IResponseData<IAdsetInfoResponse>>(`partner/agency/${campaignType}/${slug}/info`, {}, {
			cache: {
				id: `agency-adset-info-${campaignType}-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		})
		.then(res => responseToData(res.data))
}
