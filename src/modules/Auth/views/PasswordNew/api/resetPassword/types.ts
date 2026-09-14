export type TResetPasswordModel = {
	token: string
	email: string
	password: string
	passwordConfirmation: string
}

export type TResetPasswordPayload = {
	token: string
	email: string
	password: string
	password_confirmation: string
}
