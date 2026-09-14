import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'
import type { ICampaignsQueryParams } from '@/modules/Partner/views/Campaigns/types'

import { responseToData } from './adapter'
import type { ISpecialProjectCreative, ISpecialProjectCreativeResponse } from './types'

export const getSpecialProjectCreatives = (data: ICampaignsQueryParams): Promise<IPaginatedData<ISpecialProjectCreative[]>> => {
	return Api.get<IResponsePaginatedData<ISpecialProjectCreativeResponse[]>>(
		'partner/campaigns/special_project/ad', data, {
			cache: {
				id: `partner-special-project-creatives-${new URLSearchParams(data as any).toString()}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res))
}
