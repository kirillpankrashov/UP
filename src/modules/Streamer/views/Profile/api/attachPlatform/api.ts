import type { IResponseMessage, Platform } from '@/core/types'
import { Api } from '@/core/client'

import { modelToPayload } from './adapter'
import type { TAttachPlatformModel } from './types'

export const attachPlatform = (
	model: TAttachPlatformModel,
	platform: Platform,
) => {
	return Api
		.post<IResponseMessage>(`streamer/attach/${platform}/save`, modelToPayload(model))
		.then(res => res)
}
