import type { IResponseData } from '@/core/types/response'
import { Api } from '@/core/client'
import type { ISegmentList, ISegmentListResponse } from '@/modules/Partner/views/Segments/api/types'

import { responseToData } from './adapter'

export const searchSegments = (title: string): Promise<ISegmentList[]> => {
	return Api.get<IResponseData<ISegmentListResponse[]>>(
		'partner/agency/segments/search', { q: title })
		.then(res => responseToData(res.data))
}
