import type { IStatus } from '@/core/types/response'
import { Api } from '@/core/client'

export const attachStreamer = (streamerId: number, segmentId: number) => {
	return Api.post<IStatus>(`partner/agency/segments/${segmentId}/streamer/${streamerId}/attach`, {}, {
		cache: {
			update: {
				'segment': { type: 'deletePrefix', value: 'partner-segment-info' },
				'segments': { type: 'deletePrefix', value: 'partner-segments' },
			},
		},
	})
}
