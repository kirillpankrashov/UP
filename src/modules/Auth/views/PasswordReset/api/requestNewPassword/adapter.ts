import type { TRequestNewPasswordModel, TRequestNewPasswordPayload } from './types'

export const modelToPayload = (model: TRequestNewPasswordModel): TRequestNewPasswordPayload => {
	return {
		email: model.email,
	}
}
