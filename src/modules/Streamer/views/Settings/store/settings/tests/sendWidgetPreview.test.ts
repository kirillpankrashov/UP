import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { sendWidgetPreview } from '@/modules/Streamer/views/Settings/api'

import { useSettingsStore } from '../settings'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')

describe('Settings Store sendWidgetPreview', () => {
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

	it('sendWidgetPreview – success', async () => {
		const { settingsStore } = await factory()

		expect(settingsStore.widgetPreview.sending).toBe(false)
		expect(settingsStore.widgetPreview.success).toBe(false)

		const promise = settingsStore.sendWidgetPreview()

		expect(settingsStore.widgetPreview.sending).toBe(true)
		expect(settingsStore.widgetPreview.success).toBe(false)

		await promise

		expect(settingsStore.widgetPreview.success).toBe(true)

		vi.runAllTimers()

		expect(sendWidgetPreview).toHaveBeenCalled()

		expect(settingsStore.widgetPreview.sending).toBe(false)
		expect(settingsStore.widgetPreview.success).toBe(false)
	})

	it('sendWidgetPreview – fail', async () => {
		const { settingsStore } = await factory();

		(sendWidgetPreview as Mock).mockRejectedValueOnce({ status: false })

		expect(settingsStore.widgetPreview.sending).toBe(false)
		expect(settingsStore.widgetPreview.success).toBe(false)

		const promise = settingsStore.sendWidgetPreview()

		expect(settingsStore.widgetPreview.sending).toBe(true)
		expect(settingsStore.widgetPreview.success).toBe(false)

		await promise

		expect(settingsStore.widgetPreview.success).toBe(false)

		vi.runAllTimers()

		expect(sendWidgetPreview).toHaveBeenCalled()

		expect(settingsStore.widgetPreview.sending).toBe(false)
		expect(settingsStore.widgetPreview.success).toBe(false)
	})
})
