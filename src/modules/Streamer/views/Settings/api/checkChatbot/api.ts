import type { IResponse, Platform } from '@/core/types'
import { Api } from '@/core/client'

import type { TCheckChatbotStatus } from './types'

export const checkChatbot = (platform: Platform) => {
	return Api.get<IResponse<TCheckChatbotStatus>>(`streamer/${platform}/moderator`).then(
		(res) => res,
	)
}
