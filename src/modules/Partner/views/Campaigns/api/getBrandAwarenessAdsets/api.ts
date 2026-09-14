import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'
import type { ICampaignsQueryParams } from '@/modules/Partner/views/Campaigns/types'

import { responseToData } from './adapter'
import type { IBrandAwarenessAdset, IBrandAwarenessAdsetResponse } from './types'

export const getBrandAwarenessAdsets = (data: ICampaignsQueryParams): Promise<IPaginatedData<IBrandAwarenessAdset[]>> => {
	return Api.get<IResponsePaginatedData<IBrandAwarenessAdsetResponse[]>>(
		'partner/campaigns/brand_awareness/ad-set', data, {
			cache: {
				id: `partner-brand-awareness-adsets-${new URLSearchParams(data as any).toString()}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res))
}
