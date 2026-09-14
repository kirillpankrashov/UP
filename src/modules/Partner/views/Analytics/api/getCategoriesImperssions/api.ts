import type { IPaginatedData,IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { ICategoriesImperssions, ICategoriesImperssionsResponse } from './types'

export const getCategoriesImperssions = ({
	campaignType,
	slug,
	start,
	end,
	page,
}: {
	campaignType: string
	slug: string
	start: string
	end: string
	page?: number
}): Promise<IPaginatedData<ICategoriesImperssions>> => {
	return Api.get<IResponsePaginatedData<ICategoriesImperssionsResponse>>(`statistic/campaigns/${campaignType}/categories/${slug}/${start}/${end}`, {
		page,
	}, {
		cache: {
			id: `partner-campaign-categories-imperssions-${campaignType}-${slug}-${start}-${end}-${page}`,
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res))
}
