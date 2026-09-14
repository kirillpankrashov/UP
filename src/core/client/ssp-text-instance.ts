import { Api } from './api'
import { Client } from './client'

export class SspClient extends Client {}

export const client = new SspClient()

export class SspTextApi extends Api {
	static client = client
	static apiUrl = import.meta.env.VITE_APP_SSP_TEXT_API_URL
}
