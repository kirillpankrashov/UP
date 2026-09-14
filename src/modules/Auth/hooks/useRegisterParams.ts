import type { LocationQuery } from 'vue-router'

interface RegistrationParameters {
  promo?: string
  utm?: {
    [propName: string]: string
  }
}

const REGISTER_PARAMS_TOKEN = 'registration-params'

export const useRegisterParams = () => {
	const getRegisterParams = (): RegistrationParameters => {
		const paramsString = localStorage.getItem(REGISTER_PARAMS_TOKEN)
		if (!paramsString) return {}

		const paramsJSON = JSON.parse(paramsString)
		return Object.keys(paramsJSON).reduce((acc, key) => {
			const utm = acc.utm || {}

			if (key === 'promo') {
				const promo = paramsJSON.promo
				return { ...acc, promo }
			}

			if (key.includes('utm_')) {
				return {
					...acc,
					utm: {
						...utm,
						[key]: paramsJSON[key],
					},
				}
			}

			return acc
		}, {} as RegistrationParameters)
	}

	const setRegisterParams = (query: LocationQuery) => {
		const params: Record<string, any> = {}

		Object.keys(query).forEach(key => {
			if (key === 'promo') {
				params[key] = query[key]
			}

			if (key.includes('utm_')) {
				params[key] = query[key]
			}

			localStorage.setItem(REGISTER_PARAMS_TOKEN, JSON.stringify(params))
		})
	}

	return {
		getRegisterParams,
		setRegisterParams,
	}
}
