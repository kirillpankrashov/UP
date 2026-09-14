import type { IPaginatedData,IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IStreamersStatistics, IStreamersStatisticsResponse } from './types'

export const getStreamersStatistics = ({
	campaignType,
	slug,
	start,
	end,
	page,
	sortBy,
	sortDirection,
}: {
	campaignType: string
	slug: string
	start: string
	end: string
	page?: number
	sortBy?: string
	sortDirection?: 'asc' | 'desc'
}): Promise<IPaginatedData<IStreamersStatistics>> => {
	return Api.get<IResponsePaginatedData<IStreamersStatisticsResponse>>(`statistic/campaigns/${campaignType}/creators/${slug}/${start}/${end}`, {
		page,
		sortBy,
		sortDirection,
	}, {
		cache: {
			id: `partner-campaign-streamers-statistics-${campaignType}-${slug}-${start}-${end}-${page}-${sortBy}-${sortDirection}`,
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res))
}
