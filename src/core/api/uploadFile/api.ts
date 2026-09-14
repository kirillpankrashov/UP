import axios from 'axios'

import { dataToPayload } from './adapter'
import type {
	IFileMeta,
	IUploadConfigData,
} from './types'

export const getSignedUrl = async (data: IUploadConfigData, url?: string, headers?: Record<string, string>) => {
	const uploadUrl = url || `${import.meta.env.VITE_APP_API_URL}gcp/upload/config`

	const res = await fetch(uploadUrl, {
		method: 'POST',
		body: JSON.stringify(dataToPayload(data)),
		// body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
	}).then(res => res.json())

	return res
}

export const uploadFile = async ({
	signedUrl,
	file,
	contentType,
}: {
	signedUrl: string
	file: File
	contentType?: string
}): Promise<void> => {
	const response = await fetch(signedUrl, {
		method: 'PUT',
		body: file,
		headers: {
			'Content-Type': contentType || file.type,
		},
	})

	if (!response.ok) {
		throw new Error(`Upload failed: ${response.statusText}`)
	}
}

export const getFileMeta = async (path: string): Promise<IFileMeta> => {
	return await axios.post<{body:IFileMeta}>('https://video-meta-485586579534.europe-west1.run.app/api/video-info', {
		path,
	}).then(res => res.data.body)
}
