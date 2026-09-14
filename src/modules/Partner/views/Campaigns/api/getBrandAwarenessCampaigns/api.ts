import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'
import type { ICampaignsQueryParams } from '@/modules/Partner/views/Campaigns/types'

import { responseToData } from './adapter'
import type { IBrandAwarenessCampaign, IBrandAwarenessCampaignResponse } from './types'

export const getBrandAwarenessCampaigns = (data: ICampaignsQueryParams): Promise<IPaginatedData<IBrandAwarenessCampaign[]>> => {
	return Api.get<IResponsePaginatedData<IBrandAwarenessCampaignResponse[]>>(
		'partner/campaigns/brand_awareness', data, {
			cache: {
				id: `partner-brand-awareness-campaigns-${new URLSearchParams(data as any).toString()}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res))
}
