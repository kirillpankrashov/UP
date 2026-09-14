import type { TEmailVerificationModel, TEmailVerificationPayload } from './types'

export const modelToPayload = (model: TEmailVerificationModel): TEmailVerificationPayload => {
	return {
		token: model.token,
	}
}
