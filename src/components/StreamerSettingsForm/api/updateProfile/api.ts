import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

import { modelToPayload } from './adapter'
import type { TProfileModel } from './types'

export const updateProfile = (model: TProfileModel) => {
	return Api
		.post<IResponseMessage>('streamer/profile', modelToPayload(model))
		.then(res => res)
}
