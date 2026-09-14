import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'
import type { ICampaignsQueryParams } from '@/modules/Partner/views/Campaigns/types'

import { responseToData } from './adapter'
import type { IPrerollAdset, IPrerollAdsetResponse } from './types'

export const getPrerollAdsets = (data: ICampaignsQueryParams): Promise<IPaginatedData<IPrerollAdset[]>> => {
	return Api.get<IResponsePaginatedData<IPrerollAdsetResponse[]>>(
		'partner/campaigns/preroll/ad-set', data, {
			cache: {
				id: `partner-preroll-adsets-${new URLSearchParams(data as any).toString()}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res))
}
