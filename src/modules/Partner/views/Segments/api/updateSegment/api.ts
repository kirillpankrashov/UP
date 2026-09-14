import type { IResponseMessage } from '@/core/types/response'
import { Api } from '@/core/client'

export const updateSegment = (segmentId: number, data: {
	title: string
	streamers: number[]
}) => {
	return Api.post<IResponseMessage>(`partner/agency/segments/${segmentId}/update`, data, {
		cache: {
			update: {
				'segment': { type: 'deletePrefix', value: 'partner-segment-info' },
				'segments': { type: 'deletePrefix', value: 'partner-segments' },
			},
		},
	})
}
