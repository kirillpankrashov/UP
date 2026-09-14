import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'
import type { ISegment, ISegmentResponse } from '@/modules/Partner/views/Segments/api/types'

import { responseToData } from './adapter'

export const getSegment = (segmentId: number): Promise<ISegment> => {
	return Api.get<IResponseData<ISegmentResponse>>(
		`partner/agency/segments/${segmentId}/show`, {}, {
			cache: {
				id: `partner-segment-info-${segmentId}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
