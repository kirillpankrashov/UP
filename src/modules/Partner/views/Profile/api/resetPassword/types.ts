export interface IChangePasswordData {
	current: string
	password: string
	passwordConfirmation: string
}

export interface IChangePasswordPayload {
	current: string
	password: string
	password_confirmation: string
}
