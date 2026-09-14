import type { IResponsePaginatedData } from '@/core/types/response'
import type { IPaginatedData } from '@/core/types/response'

import { type IAdsetStreamer, type IAdsetStreamerResponse } from './types'

export const fromResponseToData = (response: IResponsePaginatedData<IAdsetStreamerResponse[]>): IPaginatedData<IAdsetStreamer[]> => ({
	status: response.status,
	total: response.total,
	perPage: response.per_page,
	data: response.data.map(creator => ({
		nickname: creator.creator_nickname,
		revenue: creator.revenue,
		currency: creator.currency,
		impressions: creator.impressions,
		averageCtr: creator.average_ctr,
		dailyCtr: creator.daily_ctr,
		status: creator.status,
	})),
})
