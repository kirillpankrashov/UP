import type { IResponse } from '@/core/types'
import { Api } from '@/core/client'

import { modelToPayload, responseToData } from './adapter'
import type { TPartnerSignin, TPartnerSigninModel, TPartnerSigninResponse } from './types'

export const partnerSignin = (model: TPartnerSigninModel): Promise<TPartnerSignin> => {
	return Api
		.post<IResponse<TPartnerSigninResponse>>('auth/partner', modelToPayload(model))
		.then(res => responseToData(res))
}
