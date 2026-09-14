export interface IReferralHistoryDetailResponse {
  streamer: {
		id: number
		twitch_id: string
		youtube_id: string
		nickname: string
		avatar: string
		name: string
		email: string
	}
	amount: number
}

export interface IReferralHistoryDetail {
  streamer: {
		id: number
		twitchId: string
		youtubeId: string
		nickname: string
		avatar: string
		name: string
		email: string
	}
	amount: number
}
