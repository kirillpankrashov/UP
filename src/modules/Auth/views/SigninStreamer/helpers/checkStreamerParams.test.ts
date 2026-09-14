import { type RouteLocationNormalizedLoaded } from 'vue-router'
import { beforeEach, describe, expect, it } from 'vitest'

import { checkStreamerParams } from './checkStreamerParams'

describe('checkStreamerParams', () => {
	beforeEach(() => {
		localStorage.clear()
	})

	it('saves streamer data to local storage if any query parameters are present', () => {
		const route: RouteLocationNormalizedLoaded = {
			query: {
				email: 'test@example.com',
				country: 'US',
				language: 'en',
				gender: 'male',
				birthday: '1990-01-01',
			},
		} as unknown as RouteLocationNormalizedLoaded

		checkStreamerParams(route)

		const savedData = localStorage.getItem('saved-streamer-data')
		expect(savedData).toEqual(JSON.stringify(route.query))
	})

	it('not save streamer data to local storage if no query parameters are present', () => {
		const route: RouteLocationNormalizedLoaded = {
			query: {},
		} as unknown as RouteLocationNormalizedLoaded

		checkStreamerParams(route)

		const savedData = localStorage.getItem('saved-streamer-data')
		expect(savedData).toBeNull()
	})
})
