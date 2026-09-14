import type { TPartnerSignin, TPartnerSigninModel, TPartnerSigninPayload, TPartnerSigninResponse } from './types'

export const modelToPayload = (model: TPartnerSigninModel): TPartnerSigninPayload => {
	return {
		login: model.login,
		password: model.password,
	}
}

export const responseToData = (response: TPartnerSigninResponse): TPartnerSignin => {
	return {
		token: response.token,
	}
}
