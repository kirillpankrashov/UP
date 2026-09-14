import type { IResponse, Platform } from '@/core/types'
import { Api } from '@/core/client'

import type { TConnectChatbot } from './types'

export const connectChatbot = (platform: Platform) => {
	return Api.get<IResponse<TConnectChatbot>>(`auth/nightbot/${platform}`).then(
		(res) => res,
	)
}
