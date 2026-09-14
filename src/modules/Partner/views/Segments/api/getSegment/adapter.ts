import type { ISegment, ISegmentResponse } from '@/modules/Partner/views/Segments/api/types'

export const responseToData = (response: ISegmentResponse): ISegment => {
	return {
		id: response.id,
		title: response.title,
		icon: response.icon,
		streamers: response.streamers.map(streamer => ({
			id: streamer.id,
			name: streamer.name,
			lastActivityAt: streamer.last_activity_at,
		})),
	}
}
