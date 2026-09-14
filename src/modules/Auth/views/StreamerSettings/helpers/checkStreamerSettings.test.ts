import { afterEach, beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { getToken } from '@/core/helpers'
import { RouteName } from '@/modules/Auth/router'

import { checkStreamerParams } from './checkStreamerParams'
import { checkStreamerSettings } from './checkStreamerSettings'

vi.mock('@/core/helpers')
vi.mock('./checkStreamerParams', () => ({
	checkStreamerParams: vi.fn(),
}))

describe('checkStreamerSettings', () => {
	let router: any
	let model: any

	beforeEach(() => {
		router = {
			push: vi.fn(),
		}
		model = {}
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it(`redirects to ${RouteName.AUTH_STREAMER} route if token is not present`, () => {
		(getToken as Mock).mockReturnValueOnce(null)

		checkStreamerSettings(router, model)

		expect(router.push).toHaveBeenCalledWith({ name: RouteName.AUTH_STREAMER })
		expect(checkStreamerParams).not.toHaveBeenCalled()
	})

	it('calls checkStreamerParams if token is present', () => {
		(getToken as Mock).mockReturnValueOnce('token')

		checkStreamerSettings(router, model)

		expect(router.push).not.toHaveBeenCalled()
		expect(checkStreamerParams).toHaveBeenCalledWith(model)
	})
})
