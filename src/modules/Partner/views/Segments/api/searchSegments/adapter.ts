import type { ISegmentList, ISegmentListResponse } from '@/modules/Partner/views/Segments/api/types'

export const responseToData = (response: ISegmentListResponse[]): ISegmentList[] => {
	return response.map(segment => ({
		id: segment.id,
		title: segment.title,
		icon: segment.icon,
		createdAt: segment.created_at,
		streamers: segment.streamers,
	}))
}
