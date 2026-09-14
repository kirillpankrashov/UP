import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

import { modelToPayload } from './adapter'
import type { TEmailVerificationModel } from './types'

export const verifyEmail = (model: TEmailVerificationModel) => {
	return Api
		.post<IResponseMessage>('email/verification', modelToPayload(model))
		.then(res => res)
}
