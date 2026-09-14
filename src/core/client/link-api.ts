import { Api } from './api'
import { Client } from './client'

export class LinkClient extends Client {
	constructor() {
		super()

		delete this.axios.defaults.headers.common['x-uplify-domain']
	}

	setHeaders(streamerId: number) {
		this.axios.defaults.headers.common['x-streamer-id'] = streamerId
		this.axios.defaults.headers.common['x-user-role'] = 'streamer'
		this.axios.defaults.headers.common.Authorization = `ApiKey ${import.meta.env.VITE_APP_FREEMIUM_API_KEY}`
	}
}

export const linkClient = new LinkClient()

export class LinkApi extends Api {
	static client = linkClient
	static apiUrl = import.meta.env.VITE_APP_FREEMIUM_API_URL
}

export class LinkPublicClient extends Client {
	constructor() {
		super()

		delete this.axios.defaults.headers.common['x-uplify-domain']
	}
}

export const linkPublicClient = new LinkPublicClient()

export class LinkPublicApi extends Api {
	static client = linkPublicClient
	static apiUrl = import.meta.env.VITE_APP_FREEMIUM_API_URL
}
