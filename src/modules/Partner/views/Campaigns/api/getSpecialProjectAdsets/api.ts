import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'
import type { ICampaignsQueryParams } from '@/modules/Partner/views/Campaigns/types'

import { responseToData } from './adapter'
import type { ISpecialProjectAdset, ISpecialProjectAdsetResponse } from './types'

export const getSpecialProjectAdsets = (data: ICampaignsQueryParams): Promise<IPaginatedData<ISpecialProjectAdset[]>> => {
	return Api.get<IResponsePaginatedData<ISpecialProjectAdsetResponse[]>>(
		'partner/campaigns/special_project/ad-set', data, {
			cache: {
				id: `partner-special-project-adsets-${new URLSearchParams(data as any).toString()}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res))
}
