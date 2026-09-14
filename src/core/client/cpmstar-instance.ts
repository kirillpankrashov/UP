import { Api } from './api'
import { Client } from './client'

export class CpmStarClient extends Client {}

export const client = new CpmStarClient()

export class CpmStarApi extends Api {
	static client = client
	static apiUrl = import.meta.env.VITE_APP_CPMSTAR_API_URL
}
