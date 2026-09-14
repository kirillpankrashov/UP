import { type IResponseMessage, type Platform } from '@/core/types'
import { Api } from '@/core/client'

export const sendMessagePreview = (platform: Platform) => {
	return Api.get<IResponseMessage>(`nightbot/${platform}/messages/test`).then(
		(res) => res,
	)
}
