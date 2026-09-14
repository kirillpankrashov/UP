import { Api } from './api'
import { Client } from './client'

export class SspClient extends Client {}

export const client = new SspClient()

export class SspMediaApi extends Api {
	static client = client
	static apiUrl = import.meta.env.VITE_APP_SSP_MEDIA_API_URL
}
