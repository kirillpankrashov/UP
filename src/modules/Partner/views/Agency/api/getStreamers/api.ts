import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IStreamer, IStreamerResponse } from './types'

export const getStreamers = (data: { page: number; q?: string }): Promise<IPaginatedData<IStreamer[]>> => {
	return Api
		.get<IResponsePaginatedData<IStreamerResponse[]>>('partner/agency/streamers', data, {
			cache: {
				id: `agency-streamers-${JSON.stringify(data)}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		})
		.then(res => responseToData(res))
}
