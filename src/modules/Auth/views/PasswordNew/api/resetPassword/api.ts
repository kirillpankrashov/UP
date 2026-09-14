import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

import { modelToPayload } from './adapter'
import type { TResetPasswordModel } from './types'

export const resetPassword = (model: TResetPasswordModel) => {
	return Api
		.post<IResponseMessage>('partner/password/reset', modelToPayload(model))
		.then(res => res)
}
