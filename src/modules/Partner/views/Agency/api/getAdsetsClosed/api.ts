import type { CampaignType } from '@/core/types'
import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import type { IAdset, IAdsetResponse } from '../getAdsetsActive/types'

import { responseToData } from './adapter'

export const getAdsetsClosed = (data: { page: number }, campaignType: CampaignType): Promise<IPaginatedData<IAdset[]>> => {
	return Api
		.get<IResponsePaginatedData<IAdsetResponse[]>>(`partner/agency/${campaignType}/closed`, data, {
			cache: {
				id: `agency-adsets-closed-${campaignType}-${JSON.stringify(data)}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		})
		.then(res => responseToData(res))
}
