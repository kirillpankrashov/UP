import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'
import type { ISegmentList, ISegmentListResponse } from '@/modules/Partner/views/Segments/api/types'
import type { ISegmentsQueryParams } from '@/modules/Partner/views/Segments/types'

import { responseToData } from './adapter'

export const getSegments = (data: ISegmentsQueryParams): Promise<IPaginatedData<ISegmentList[]>> => {
	return Api.get<IResponsePaginatedData<ISegmentListResponse[]>>(
		'partner/agency/segments', data, {
			cache: {
				id: `partner-segments-${new URLSearchParams(data as any).toString()}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res))
}
