import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'

import type { IStreamersStatisticsResponse } from './types'
import type { IStreamersStatistics } from './types'

export const responseToData = (response: IResponsePaginatedData<IStreamersStatisticsResponse>): IPaginatedData<IStreamersStatistics> => {
	return {
		status: response.status,
		perPage: response.per_page,
		total: response.total,
		data: {
			title: response.data.title,
			status: response.data.status,
			updatedAt: response.data.updatedAt,
			dates: {
				start: response.data.start,
				end: response.data.end,
			},
			streamers: response.data.creators.map((streamer) => ({
				name: streamer.name,
				image: streamer.image,
				platform: streamer.platform,
				impressions: streamer.impressions,
				clicks: streamer.clicks,
				ctr: streamer.ctr,
			})),
		},
	}
}
