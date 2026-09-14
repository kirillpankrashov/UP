import type { IResponseData } from '@/core/types/response'

import type { IReferralStreamer, IReferralStreamerResponse } from './types'

export const responseToData = (response: IResponseData<IReferralStreamerResponse[]> & { amount: number }): IResponseData<IReferralStreamer[]> & { amount: number } => {
	return {
		status: response.status,
		data: response.data.map(item => ({
			streamer: {
				id: item.streamer.id,
				twitchId: item.streamer.twitch_id,
				youtubeId: item.streamer.youtube_id,
				nickname: item.streamer.nickname,
				avatar: item.streamer.avatar,
				name: item.streamer.name,
				email: item.streamer.email,
			},
			lastActivity: item.last_activity,
			amount: item.amount,
		})),
		amount: response.amount,
	}
}