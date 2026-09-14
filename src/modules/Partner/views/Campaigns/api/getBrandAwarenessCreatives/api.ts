import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'
import type { ICampaignsQueryParams } from '@/modules/Partner/views/Campaigns/types'

import { responseToData } from './adapter'
import type { IBrandAwarenessCreative, IBrandAwarenessCreativeResponse } from './types'

export const getBrandAwarenessCreatives = (data: ICampaignsQueryParams): Promise<IPaginatedData<IBrandAwarenessCreative[]>> => {
	return Api.get<IResponsePaginatedData<IBrandAwarenessCreativeResponse[]>>(
		'partner/campaigns/brand_awareness/ad', data, {
			cache: {
				id: `partner-brand-awareness-creatives-${new URLSearchParams(data as any).toString()}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res))
}
