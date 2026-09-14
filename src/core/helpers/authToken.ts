import { Role } from '@/core/types'
import { Client } from '@/core/client/client'

const client = Client.getInstance()

const AUTH_TOKEN = 'uplify-auth-token'
const USER_ROLE_TOKEN = 'uplify-user-role'

export const AUTH_IS_DEMO = 'is-streamer-demo'
export const AUTH_TOKEN_EXPIRES = 'expires-uplify-auth-token'
export const AUTH_TOKEN_EXPIRES_DURATION =
  process.env.NODE_ENV === 'development' ? 1000 * 10 * 3 : 1000 * 60 * 30

export const getRole = (): Role => localStorage.getItem(USER_ROLE_TOKEN) as Role

export const getToken = () => localStorage.getItem(AUTH_TOKEN)

export const setToken = (token: string, userRole: Role) => {
	const authToken = `Bearer ${token}`
	localStorage.setItem(AUTH_TOKEN, authToken)
	localStorage.setItem(USER_ROLE_TOKEN, userRole)
	client.setAuthToken(authToken)
}

export const removeToken = () => {
	localStorage.removeItem(AUTH_TOKEN)
	localStorage.removeItem(USER_ROLE_TOKEN)
	localStorage.removeItem(AUTH_IS_DEMO)
	localStorage.removeItem(AUTH_TOKEN_EXPIRES)
	location.href = '/'
}

export const initToken = () => {
	const authToken = getToken()
	const userRole = getRole()

	if (authToken && userRole) {
		client.setAuthToken(authToken)
	}
	else if (authToken) {
		removeToken()
	}
}

export const setDemoToken = () => {
	localStorage.setItem(AUTH_IS_DEMO, '1')
	localStorage.setItem(
		AUTH_TOKEN_EXPIRES,
		(new Date().getTime() + AUTH_TOKEN_EXPIRES_DURATION).toString(),
	)
}

export const isDemoTokenExpired = () => {
	if (localStorage.getItem(AUTH_IS_DEMO)) {
		const currentTime = new Date().getTime()
		const tokenTime = localStorage.getItem(AUTH_TOKEN_EXPIRES) || 0

		return currentTime >= +tokenTime
	}

	return false
}
