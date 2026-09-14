import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import type { ICategoryDistribution } from './types'

export const getCategoriesDistribution = ({
	campaignType,
	slug,
	start,
	end,
}: {
	campaignType: string
	slug: string
	start: string
	end: string
}): Promise<ICategoryDistribution[]> => {
	return Api.get<IResponseData<ICategoryDistribution[]>>(`statistic/campaigns/${campaignType}/categories/distribution/${slug}/${start}/${end}`, undefined, {
		cache: {
			id: `partner-campaign-categories-distribution-${campaignType}-${slug}-${start}-${end}`,
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => res.data)
}
