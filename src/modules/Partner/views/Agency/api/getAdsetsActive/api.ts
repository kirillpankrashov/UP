import type { CampaignType } from '@/core/types'
import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IAdset, IAdsetResponse } from './types'

export const getAdsetsActive = (data: { page: number}, campaignType: CampaignType): Promise<IPaginatedData<IAdset[]>> => {
	return Api
		.get<IResponsePaginatedData<IAdsetResponse[]>>(`partner/agency/${campaignType}/active`, data, {
			cache: {
				id: `agency-adsets-active-${campaignType}-${JSON.stringify(data)}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		})
		.then(res => responseToData(res))
}
