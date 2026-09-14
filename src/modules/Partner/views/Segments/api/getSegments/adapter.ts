import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import type { ISegmentList, ISegmentListResponse } from '@/modules/Partner/views/Segments/api/types'

export const responseToData = (response: IResponsePaginatedData<ISegmentListResponse[]>): IPaginatedData<ISegmentList[]> => {
	return {
		status: response.status,
		perPage: response.per_page,
		total: response.total,
		data: response.data.map(segment => ({
			id: segment.id,
			title: segment.title,
			icon: segment.icon,
			createdAt: segment.created_at,
			streamers: segment.streamers,
		})),
	}
}
