import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'

import type { IReferralHistoryDetail,IReferralHistoryDetailResponse } from './types'

export const responseToData = (response: IResponsePaginatedData<IReferralHistoryDetailResponse[]>): IPaginatedData<IReferralHistoryDetail[]> => {
	return {
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
			amount: item.amount,
		})),
		total: response.total,
		perPage: response.per_page,
		status: response.status,
	}
}