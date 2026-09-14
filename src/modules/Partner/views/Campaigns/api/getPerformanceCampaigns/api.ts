import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'
import type { ICampaignsQueryParams } from '@/modules/Partner/views/Campaigns/types'

import { responseToData } from './adapter'
import type { IPerformanceCampaign, IPerformanceCampaignResponse } from './types'

export const getPerformanceCampaigns = (data: ICampaignsQueryParams): Promise<IPaginatedData<IPerformanceCampaign[]>> => {
	return Api.get<IResponsePaginatedData<IPerformanceCampaignResponse[]>>(
		'partner/campaigns/performance', data, {
			cache: {
				id: `partner-performance-campaigns-${new URLSearchParams(data as any).toString()}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res))
}
