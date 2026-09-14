import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { refreshObsLink } from '@/modules/Streamer/views/Settings/api'

import { useSettingsStore } from '../settings'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')

describe('Settings Store refreshObsLink', () => {
	beforeEach(() => {
		vi.useFakeTimers()
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (fetchWidget: boolean = true) => {
		const settingsStore = useSettingsStore()
		if (fetchWidget) {
			await settingsStore.fetchWidget()
		}

		return { settingsStore }
	}

	it('refreshObsLink – success', async () => {
		const { settingsStore } = await factory()

		expect(settingsStore.obsLink.sending).toBe(false)
		expect(settingsStore.obsLink.success).toBe(false)

		const promise = settingsStore.refreshObsLink()

		expect(settingsStore.obsLink.sending).toBe(true)
		expect(settingsStore.obsLink.success).toBe(false)

		await promise

		expect(settingsStore.obsLink.success).toBe(true)

		vi.runAllTimers()

		expect(refreshObsLink).toHaveBeenCalled()

		expect(settingsStore.obsLink.sending).toBe(false)
		expect(settingsStore.obsLink.success).toBe(false)
	})

	it('refreshObsLink – fail', async () => {
		const { settingsStore } = await factory();

		(refreshObsLink as Mock).mockRejectedValueOnce({ status: false })

		expect(settingsStore.obsLink.sending).toBe(false)
		expect(settingsStore.obsLink.success).toBe(false)

		const promise = settingsStore.refreshObsLink()

		expect(settingsStore.obsLink.sending).toBe(true)
		expect(settingsStore.obsLink.success).toBe(false)

		await promise

		expect(settingsStore.obsLink.success).toBe(false)

		vi.runAllTimers()

		expect(refreshObsLink).toHaveBeenCalled()

		expect(settingsStore.obsLink.sending).toBe(false)
		expect(settingsStore.obsLink.success).toBe(false)
	})
})
