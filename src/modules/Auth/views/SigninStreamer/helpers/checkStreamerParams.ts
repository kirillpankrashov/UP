import type { RouteLocationNormalizedLoaded } from 'vue-router'

export const checkStreamerParams = (route: RouteLocationNormalizedLoaded) => {
	const {
		email,
		country,
		language,
		gender,
		birthday,
	} = route.query

	if (email || country || language || gender || birthday) {
		localStorage.setItem('saved-streamer-data', JSON.stringify({
			email,
			country,
			language,
			gender,
			birthday,
		}))
	}
}
