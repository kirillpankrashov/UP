import axios, { type AxiosRequestConfig, type CancelToken } from 'axios'

import { Logger } from '../helpers'

interface VaporOptions {
    signedStorageUrl?: string
    key?: string
    bucket?: string
    contentType?: string
    expires?: string
    visibility?: string
    data?: Record<string, any>
    baseURL?: string | null
    headers?: Record<string, string>
    options?: AxiosRequestConfig
    progress?: (progress: number) => void
    cancelToken?: CancelToken
}

type VaporResponse = {
    url: string
    headers: Record<string, string>
    extension: string
    [key: string]: any
} | {
	data: {
		url: string
    headers: Record<string, string>
    extension: string
    [key: string]: any
	}
}

let assetUrlResolver = (): string => {
	try {
		return process.env.MIX_VAPOR_ASSET_URL
			? process.env.MIX_VAPOR_ASSET_URL
			: ''
	}
	catch (e) {
		Logger.error('Unable to automatically resolve the asset URL. Use Vapor.withBaseAssetUrl() to specify it manually.', true, e)
		throw e
	}
}

class Vapor {
	/**
     * Generate the S3 URL to an application asset.
     */
	asset(path: string): string {
		return assetUrlResolver() + '/' + path
	}

	/**
     * Set the base URL for assets.
     */
	withBaseAssetUrl(url: string): void {
		assetUrlResolver = () => url ? url : ''
	}

	/**
     * Store a file in S3 and return its UUID, key, and other information.
     */
	async store(file: File, options: VaporOptions = {}): Promise<VaporResponse> {
		const response = await axios.post<VaporResponse>(options.signedStorageUrl || '/vapor/signed-storage-url', {
			'key': options.key || '',
			'bucket': options.bucket || '',
			'content_type': options.contentType || file.type,
			'expires': options.expires || '',
			'visibility': options.visibility || '',
			...options.data,
		}, {
			baseURL: options.baseURL || undefined,
			headers: options.headers || {},
			...options.options,
		})

		const data = 'data' in response.data ? response.data.data : response.data

		const headers = { ...data.headers }

		if ('Host' in headers) {
			delete headers.Host
		}

		const progress = options.progress || (() => {})

		const cancelToken = options.cancelToken

		await axios.put(data.url, file, {
			cancelToken: cancelToken,
			headers: headers,
			onUploadProgress: (progressEvent) => {
				progress(progressEvent.loaded / (progressEvent.total || 1))
			},
		})

		data.extension = file.name.split('.').pop() || ''

		return data
	}
}

export default new Vapor()

