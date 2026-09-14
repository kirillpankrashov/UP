import type { IChangePasswordData, IChangePasswordPayload } from './types'

export const dataToPayload = (data: IChangePasswordData): IChangePasswordPayload => {
	return {
		current: data.current,
		password: data.password,
		password_confirmation: data.passwordConfirmation,
	}
}
