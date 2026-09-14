import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { ICampaignStatistics, ICampaignStatisticsResponse } from './types'

export const getCampaignStatistics = ({
	campaignType,
	slug,
	start,
	end,
}: {
	campaignType: string
	slug: string
	start: string
	end: string
}): Promise<ICampaignStatistics> => {
	return Api.get<IResponseData<ICampaignStatisticsResponse>>(`statistic/campaigns/${campaignType}/campaigns/${slug}/${start}/${end}`, undefined, {
		cache: {
			id: `partner-campaign-statistics-${campaignType}-${slug}-${start}-${end}`,
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res.data))
}
