import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { sendManual } from '@/modules/Streamer/views/Settings/api'

import { useSettingsStore } from '../settings'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')

describe('Settings Store sendManual', () => {
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

	it('sendManual – success', async () => {
		const { settingsStore } = await factory()

		expect(settingsStore.manual.sending).toBe(false)
		expect(settingsStore.manual.success).toBe(false)

		const promise = settingsStore.sendManual()

		expect(settingsStore.manual.sending).toBe(true)
		expect(settingsStore.manual.success).toBe(false)

		await promise

		expect(settingsStore.manual.success).toBe(true)

		vi.runAllTimers()

		expect(sendManual).toHaveBeenCalled()

		expect(settingsStore.manual.sending).toBe(false)
		expect(settingsStore.manual.success).toBe(false)
	})

	it('sendManual – fail', async () => {
		const { settingsStore } = await factory();

		(sendManual as Mock).mockRejectedValueOnce({ status: false })

		expect(settingsStore.manual.sending).toBe(false)
		expect(settingsStore.manual.success).toBe(false)

		const promise = settingsStore.sendManual()

		expect(settingsStore.manual.sending).toBe(true)
		expect(settingsStore.manual.success).toBe(false)

		await promise

		expect(settingsStore.manual.success).toBe(false)

		vi.runAllTimers()

		expect(sendManual).toHaveBeenCalled()

		expect(settingsStore.manual.sending).toBe(false)
		expect(settingsStore.manual.success).toBe(false)
	})
})
