import { describe, expect, it, vi } from 'vitest'

import { checkStreamerParams } from './checkStreamerParams'

vi.mock('@/core/helpers')

describe('checkStreamerParams', () => {
	it('should update the model with the values from localStorage', () => {
		const model = {
			email: '',
			country: '',
			language: '',
			gender: '',
			birthday: '',
		}

		const streamerData = {
			email: 'test@example.com',
			country: 'US',
			language: 'en',
			gender: 'male',
			birthday: '1990-01-01',
		}

		vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(streamerData))

		checkStreamerParams(model)

		expect(model.email).toBe(streamerData.email)
		expect(model.country).toBe(streamerData.country)
		expect(model.language).toBe(streamerData.language)
		expect(model.gender).toBe(streamerData.gender)
		expect(model.birthday).toBe(streamerData.birthday)
	})

	it('should not update the model if localStorage is empty', () => {
		const model = {
			email: 'test@example.com',
			country: 'US',
			language: 'en',
			gender: 'male',
			birthday: '1990-01-01',
		}

		vi.mocked(localStorage.getItem).mockReturnValue('')

		checkStreamerParams(model)

		expect(model.email).toBe('test@example.com')
		expect(model.country).toBe('US')
		expect(model.language).toBe('en')
		expect(model.gender).toBe('male')
		expect(model.birthday).toBe('1990-01-01')
	})

	it('should not update the model if localStorage does not contain valid JSON', () => {
		const model = {
			email: 'test@example.com',
			country: 'US',
			language: 'en',
			gender: 'male',
			birthday: '1990-01-01',
		}

		vi.mocked(localStorage.getItem).mockReturnValue('invalid-json')

		checkStreamerParams(model)

		expect(model.email).toBe('test@example.com')
		expect(model.country).toBe('US')
		expect(model.language).toBe('en')
		expect(model.gender).toBe('male')
		expect(model.birthday).toBe('1990-01-01')
	})
})
