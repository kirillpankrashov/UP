import type { TResetPasswordModel, TResetPasswordPayload } from './types'

export const modelToPayload = (model: TResetPasswordModel): TResetPasswordPayload => {
	return {
		token: model.token,
		email: model.email,
		password: model.password,
		password_confirmation: model.passwordConfirmation,
	}
}
