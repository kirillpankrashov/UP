import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

import { modelToPayload } from './adapter'
import type { TPartnerSignupModel } from './types'

export const partnerSignup = (model: TPartnerSignupModel) => {
	return Api
		.post<IResponseMessage>('partner/request', modelToPayload(model))
		.then(res => res)
}
