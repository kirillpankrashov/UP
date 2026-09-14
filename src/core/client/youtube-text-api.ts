import { Api } from './api'
import { Client } from './client'

export class YoutubeTextClient extends Client {
	constructor() {
		super()

		delete this.axios.defaults.headers.common['x-uplify-domain']
	}
}

export const youtubeTextClient = new YoutubeTextClient()

export class YoutubeTextApi extends Api {
	static client = youtubeTextClient
	static apiUrl = import.meta.env.VITE_APP_YOUTUBE_TEXT_URL
}
