import type { CampaignType } from '@/core/types'
import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { fromResponseToData } from './adapter'
import { type IAdsetStreamer, type IAdsetStreamerResponse } from './types'

export const getAdsetStreamers = (slug: string, page: number, campaignType: CampaignType): Promise<IPaginatedData<IAdsetStreamer[]>> => {
	return Api
		.get<IResponsePaginatedData<IAdsetStreamerResponse[]>>(`partner/agency/${campaignType}/${slug}/report`, { page }, {
			cache: {
				id: `agency-adset-streamers-${campaignType}-${slug}-${JSON.stringify({ page })}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		})
		.then(res => fromResponseToData(res))
}
