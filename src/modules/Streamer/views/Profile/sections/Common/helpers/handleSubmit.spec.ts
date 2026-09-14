import { beforeEach, describe, expect, it, vi } from 'vitest'

import { updateProfile } from '@/components/StreamerSettingsForm'

import { handleSubmit, type TOnSubmitParams } from './handleSubmit'

vi.mock('@/core/helpers')
vi.mock('@/components/StreamerSettingsForm')

describe('Streamer Profile StreamerSettingsForm handleSubmit', () => {

	const model = {
		domain: '',
		email: '',
		language: '',
		country: '',
		gender: '',
		birthday: '',
	}

	const streamer = { username: 'test' }
	const cb = vi.fn()

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('updates the profile and calls callback', async () => {
		await handleSubmit({ streamer, model, cb } as unknown as TOnSubmitParams)

		expect(updateProfile).toHaveBeenCalledWith(model)

		expect(cb).toHaveBeenCalled()
	})
})
