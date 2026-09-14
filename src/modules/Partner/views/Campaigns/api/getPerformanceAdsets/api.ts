import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'
import type { ICampaignsQueryParams } from '@/modules/Partner/views/Campaigns/types'

import { responseToData } from './adapter'
import type { IPerformanceAdset, IPerformanceAdsetResponse } from './types'

export const getPerformanceAdsets = (data: ICampaignsQueryParams): Promise<IPaginatedData<IPerformanceAdset[]>> => {
	return Api.get<IResponsePaginatedData<IPerformanceAdsetResponse[]>>(
		'partner/campaigns/performance/ad-set', data, {
			cache: {
				id: `partner-performance-adsets-${new URLSearchParams(data as any).toString()}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res))
}
