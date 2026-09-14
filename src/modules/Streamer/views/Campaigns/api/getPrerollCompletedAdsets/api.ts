import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IPrerollCompletedAdset, IPrerollCompletedAdsetResponse } from './types'

export const getPrerollCompletedAdsets = (page: number): Promise<IPaginatedData<IPrerollCompletedAdset[]>> => {
	return Api.get<IResponsePaginatedData<IPrerollCompletedAdsetResponse[]>>(
		'streamer/campaigns/preroll/closed', { page }, {
			cache: {
				id: `streamer-preroll-completed-adsets-${page}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res))
}
