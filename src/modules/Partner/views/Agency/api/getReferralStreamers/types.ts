export interface IReferralStreamerResponse {
  streamer: {
		id: number
		twitch_id: string
		youtube_id: string
		nickname: string
		avatar: string
		name: string
		email: string
	}
	last_activity: number
	amount: number
}

export interface IReferralStreamer {
  streamer: {
		id: number
		twitchId: string
		youtubeId: string
		nickname: string
		avatar: string
		name: string
		email: string
	}
	lastActivity: number
	amount: number
}