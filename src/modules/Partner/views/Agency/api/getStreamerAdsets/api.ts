import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IStreamerAdset, IStreamerAdsetResponse } from './types'

export const getStreamerAdsets = (streamerId: number): Promise<IStreamerAdset[]> => {
	return Api
		.get<IResponseData<IStreamerAdsetResponse[]>>(`partner/agency/streamer/${streamerId}/report`, {}, {
			cache: {
				id: `agency-streamer-adsets-${streamerId}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		})
		.then(res => responseToData(res.data))
}
