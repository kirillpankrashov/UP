import type { TPartnerSignupModel, TPartnerSignupPayload } from './types'

export const modelToPayload = (model: TPartnerSignupModel): TPartnerSignupPayload => {
	return {
		email: model.email,
		name: model.name,
		phone: model.phone,
		company: model.company,
		domain: model.domain,
	}
}
