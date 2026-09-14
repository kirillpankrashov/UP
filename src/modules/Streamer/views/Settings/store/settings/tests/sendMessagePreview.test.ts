import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { sendMessagePreview } from '@/modules/Streamer/views/Settings/api'

import { useSettingsStore } from '../settings'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')

describe('Settings Store sendMessagePreview', () => {
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

	it('sendMessagePreview – success', async () => {
		const { settingsStore } = await factory()

		expect(settingsStore.messagePreview.sending).toBe(false)
		expect(settingsStore.messagePreview.success).toBe(false)

		const promise = settingsStore.sendMessagePreview()

		expect(settingsStore.messagePreview.sending).toBe(true)
		expect(settingsStore.messagePreview.success).toBe(false)

		await promise

		expect(settingsStore.messagePreview.success).toBe(true)

		vi.runAllTimers()

		expect(sendMessagePreview).toHaveBeenCalled()

		expect(settingsStore.messagePreview.sending).toBe(false)
		expect(settingsStore.messagePreview.success).toBe(false)
	})

	it('sendMessagePreview – fail', async () => {
		const { settingsStore } = await factory();

		(sendMessagePreview as Mock).mockRejectedValueOnce({ status: false })

		expect(settingsStore.messagePreview.sending).toBe(false)
		expect(settingsStore.messagePreview.success).toBe(false)

		const promise = settingsStore.sendMessagePreview()

		expect(settingsStore.messagePreview.sending).toBe(true)
		expect(settingsStore.messagePreview.success).toBe(false)

		await promise

		expect(settingsStore.messagePreview.success).toBe(false)

		vi.runAllTimers()

		expect(sendMessagePreview).toHaveBeenCalled()

		expect(settingsStore.messagePreview.sending).toBe(false)
		expect(settingsStore.messagePreview.success).toBe(false)
	})
})
