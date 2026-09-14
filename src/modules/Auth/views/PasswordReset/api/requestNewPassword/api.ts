import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

import { modelToPayload } from './adapter'
import type { TRequestNewPasswordModel } from './types'

export const requestNewPassword = (model: TRequestNewPasswordModel) => {
	return Api
		.post<IResponseMessage>('partner/password/forgot', modelToPayload(model))
		.then(res => res)
}
