import type { IStatus, Platform } from '@/core/types'
import { Api } from '@/core/client'

export const disconnectChatbot = (platform: Platform) => {
	return Api.get<IStatus>(`auth/nightbot/${platform}/disconnect`).then(
		(res) => res,
	)
}
