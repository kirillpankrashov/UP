import type { TProfileModel, TProfilePayload } from './types'

export const modelToPayload = (model: TProfileModel): TProfilePayload => {
	const data: TProfilePayload = {
		domain: model.domain,
		email: model.email,
		country: model.country,
		language: model.language,
		gender: model.gender,
		birthday: model.birthday,
		referral: model.referral,
		utm: model.utm,
		promo: model.promo,
	}

	if (model.referral) {
		data.referral = model.referral
	}

	if (model.utm) {
		data.utm = model.utm
	}

	if (model.promo) {
		data.promo = model.promo
	}

	return data
}
