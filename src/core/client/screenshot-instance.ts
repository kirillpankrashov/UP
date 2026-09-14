import { Api } from './api'
import { Client } from './client'

export class ScreenshotClient extends Client {
	constructor () {
		super()

		delete this.axios.defaults.headers.common['x-uplify-domain']
		this.axios.defaults.headers.post['Content-Type'] = 'application/json'
	}
}

export const client = new ScreenshotClient()

export class ScreenshotApi extends Api {
	static client = client
	static apiUrl = import.meta.env.VITE_APP_SCREENSHOT_API_URL
}
