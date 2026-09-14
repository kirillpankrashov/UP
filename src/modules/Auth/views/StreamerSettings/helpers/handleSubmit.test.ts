import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Analytic } from '@/core/helpers'
import { updateProfile } from '@/components/StreamerSettingsForm'

import { handleSubmit, type TOnSubmitParams } from './handleSubmit'

vi.mock('@/core/helpers')
vi.mock('@/components/StreamerSettingsForm')

describe('StreamerSettings StreamerSettingsForm handleSubmit', () => {
	(window as any).localStorage = {
		setItem: vi.fn(),
		getItem: vi.fn(),
		removeItem: vi.fn(),
	}

	const model = {
		domain: '',
		email: '',
		language: '',
		country: '',
		gender: '',
		birthday: '',
	}

	global.window = Object.create(window)
	Object.defineProperty(window, 'location', {
		value: {
			href: 'http://dummy.com',
		},
		writable: true,
	})

	const streamer = { username: 'test' }
	const cb = vi.fn()

	const removeItemSpy = vi.spyOn(localStorage, 'removeItem')

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('updates the profile and redirects to the homepage', async () => {
		await handleSubmit({ streamer, model, cb } as unknown as TOnSubmitParams)

		expect(updateProfile).toHaveBeenCalledWith(model)
		expect(removeItemSpy).toHaveBeenCalledWith('saved-streamer-data')
		expect(removeItemSpy).toHaveBeenCalledWith('registration-params')
		expect(Analytic.vkgoal).toHaveBeenCalledWith('complete_registration', { value: streamer.username })
		expect(Analytic.fbq).toHaveBeenCalledWith('track', 'CompleteRegistration')
		expect(window.location.href).toEqual('/')

		expect(cb).toHaveBeenCalled()
	})

	it('handles error updates profile', async () => {
		(updateProfile as Mock).mockResolvedValue({ status: false })

		await handleSubmit({ streamer, model, cb } as unknown as TOnSubmitParams)

		expect(updateProfile).toHaveBeenCalledWith(model)
		expect(removeItemSpy).not.toHaveBeenCalled()
		expect(Analytic.vkgoal).not.toHaveBeenCalled()
		expect(Analytic.fbq).not.toHaveBeenCalled()
		// expect(Logger.error).toHaveBeenCalledWith('Error updating profile')
		expect(cb).toHaveBeenCalled()
	})
})
