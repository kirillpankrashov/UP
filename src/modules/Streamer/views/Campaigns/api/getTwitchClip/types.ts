export interface ITwitchClipGetResponse {
	data: Array<{
		id: string
		url: string
		embed_url: string
		creator_id: string
		creator_name: string
		video_id: string
		game_id: string
		title: string
		view_count: number
		created_at: string
		thumbnail_url: string
		duration: number
		vod_offset: number
	}>
}

