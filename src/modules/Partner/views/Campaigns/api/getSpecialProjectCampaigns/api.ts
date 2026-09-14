import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'
import type { ICampaignsQueryParams } from '@/modules/Partner/views/Campaigns/types'

import { responseToData } from './adapter'
import type { ISpecialProjectCampaign, ISpecialProjectCampaignResponse } from './types'

export const getSpecialProjectCampaigns = (data: ICampaignsQueryParams): Promise<IPaginatedData<ISpecialProjectCampaign[]>> => {
	return Api.get<IResponsePaginatedData<ISpecialProjectCampaignResponse[]>>(
		'partner/campaigns/special_project', data, {
			cache: {
				id: `partner-special-project-campaigns-${new URLSearchParams(data as any).toString()}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res))
}
