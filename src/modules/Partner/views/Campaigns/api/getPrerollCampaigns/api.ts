import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'
import type { ICampaignsQueryParams } from '@/modules/Partner/views/Campaigns/types'

import { responseToData } from './adapter'
import type { IPrerollCampaign, IPrerollCampaignResponse } from './types'

export const getPrerollCampaigns = (data: ICampaignsQueryParams): Promise<IPaginatedData<IPrerollCampaign[]>> => {
	return Api.get<IResponsePaginatedData<IPrerollCampaignResponse[]>>(
		'partner/campaigns/preroll', data, {
			cache: {
				id: `partner-preroll-campaigns-${new URLSearchParams(data as any).toString()}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res))
}
