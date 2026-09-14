import { beforeEach, describe, expect, it } from 'vitest'

import { useRegisterParams } from './useRegisterParams'

describe('useRegisterParams', () => {
	beforeEach(() => {
		localStorage.clear()
	})

	it('getRegisterParams returns an empty object if localStorage is empty', () => {
		const { getRegisterParams } = useRegisterParams()

		const result = getRegisterParams()

		expect(result).toEqual({})
	})

	it('getRegisterParams returns the registration parameters stored in localStorage', () => {
		const { getRegisterParams, setRegisterParams } = useRegisterParams()

		const query = {
			promo: 'example-promo',
			utm_source: 'example-source',
			utm_medium: 'example-medium',
		}
		setRegisterParams(query)

		const result = getRegisterParams()

		expect(result).toEqual({
			promo: 'example-promo',
			utm: {
				utm_source: 'example-source',
				utm_medium: 'example-medium',
			},
		})
	})

	it('setRegisterParams stores the registration parameters in localStorage', () => {
		const { setRegisterParams } = useRegisterParams()

		const query = {
			promo: 'example-promo',
			utm_source: 'example-source',
			utm_medium: 'example-medium',
		}
		setRegisterParams(query)

		const storedParams = JSON.parse(localStorage.getItem('registration-params') as string)

		expect(storedParams).toEqual(query)
	})
})
