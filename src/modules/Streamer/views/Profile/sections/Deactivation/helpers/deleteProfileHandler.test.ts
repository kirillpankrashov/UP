import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { deleteProfile } from '@/modules/Streamer/views/Profile/api'

import { deleteProfileHandler } from './deleteProfileHandler'

vi.mock('@/modules/Streamer/views/Profile/api')
vi.mock('@/core/helpers')

describe('deleteProfileHandler', () => {
	global.window = Object.create(window)
	Object.defineProperty(window, 'location', {
		configurable: true,
		value: { reload: vi.fn() },
	})

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('reloads the window if the deleteProfile request is successful', async () => {
		(deleteProfile as Mock).mockResolvedValue({ status: 200 })

		await deleteProfileHandler()

		expect(deleteProfile).toHaveBeenCalled()
		expect(window.location.reload).toHaveBeenCalled()
		expect(Logger.error).not.toHaveBeenCalled()
	})

	it('logs an error if the deleteProfile request fails', async () => {
		const mockError = new Error('Request failed');
		(deleteProfile as Mock).mockRejectedValue(mockError)

		await deleteProfileHandler()

		expect(deleteProfile).toHaveBeenCalled()
		expect(window.location.reload).not.toHaveBeenCalled()
		expect(Logger.error).toHaveBeenCalledWith('Error sending deactivation request', false, mockError)
	})
})
