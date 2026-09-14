import type { IResponseData } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IAdsetAnalytics, IAdsetAnalyticsResponse } from './types'

export const getAdsetAnalytics = ({
	streamerId,
	slug,
	start,
	end,
}: {
	streamerId: number
	slug: string
	start: string
  end: string
}): Promise<IAdsetAnalytics> => {
	return Api.get<IResponseData<IAdsetAnalyticsResponse>>(`statistic/streamer/${streamerId}/campaign/${slug}/${start}/${end}`, undefined, {
		cache: {
			id: `streamer-adset-analytics-${slug}-${start}-${end}`,
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res.data))
}
