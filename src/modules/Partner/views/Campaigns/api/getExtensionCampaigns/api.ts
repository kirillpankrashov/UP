import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'
import type { ICampaignsQueryParams } from '@/modules/Partner/views/Campaigns/types'

import { responseToData } from './adapter'
import type { IExtensionCampaign, IExtensionCampaignResponse } from './types'

export const getExtensionCampaigns = (data: ICampaignsQueryParams): Promise<IPaginatedData<IExtensionCampaign[]>> => {
	return Api.get<IResponsePaginatedData<IExtensionCampaignResponse[]>>(
		'partner/campaigns/extension', data, {
			cache: {
				id: `partner-extension-campaigns-${new URLSearchParams(data as any).toString()}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res))
}
