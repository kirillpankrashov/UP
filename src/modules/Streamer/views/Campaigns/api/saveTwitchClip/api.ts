import axios from 'axios'

import type { IResponseData } from '@/core/types'

import { dataToPayload } from './adapter'
import type { ISaveTwitchClipData } from './types'

export const saveTwitchClip = async (data: ISaveTwitchClipData): Promise<IResponseData<{ success: boolean }>> => {
	const url = process.env.NODE_ENV === 'production' ? 'https://n8n.uplify.us/webhook/460d7a45-ee2e-4328-9c13-49046431f728' : 'https://n8n.uplify.us/webhook/460d7a45-ee2e-4328-9c13-49046431f728'

	return axios.post(url, dataToPayload(data), {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

