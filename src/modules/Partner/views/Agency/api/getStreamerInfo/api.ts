import type { IResponseData } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IStreamerInfoResponse } from './types'

export const getStreamerInfo = (streamerId: number) => {
	return Api.get<IResponseData<IStreamerInfoResponse>>(`partner/agency/streamer/${streamerId}/info`, {}, {
		cache: {
			id: `agency-streamer-info-${streamerId}`,
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res.data))
}
