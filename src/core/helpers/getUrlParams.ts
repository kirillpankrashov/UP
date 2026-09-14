import type { LocationQueryValue, RouteLocationNormalizedLoaded } from 'vue-router'

export const getUrlParams = (route: RouteLocationNormalizedLoaded, params: string[]) => {
	const queryParams: { [key: string]: LocationQueryValue | (LocationQueryValue | null)[] } = {}

	params.forEach(param => {
		if (param in route.query) {
			queryParams[param] = route.query[param]
		}
	})

	return queryParams
}
