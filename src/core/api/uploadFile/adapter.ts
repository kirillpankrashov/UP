import type { IUploadConfigData, IUploadConfigDataPayload } from './types'

export const dataToPayload = (data: IUploadConfigData): IUploadConfigDataPayload => {
	return {
		bucket: data.bucket,
		content_type: data.contentType,
		expires: data.expires,
		key: data.key,
		visibility: data.visibility,
	}
}
