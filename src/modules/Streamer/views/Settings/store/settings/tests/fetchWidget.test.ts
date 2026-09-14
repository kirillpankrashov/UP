import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { getWidget } from '@/modules/Streamer/views/Settings/api'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'

import { useSettingsStore } from '../settings'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')

describe('Settings Store fetchWidget', () => {
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

	it('fetchWidget – success', async () => {
		const { settingsStore } = await factory(false)

		expect(settingsStore.isFetching).toBe(false)

		const promise = settingsStore.fetchWidget()

		expect(settingsStore.isFetching).toBe(true)

		await promise

		vi.runAllTimers()

		expect(settingsStore.isFetching).toBe(false)

		expect(getWidget).toHaveBeenCalled()
		expect(settingsStore.widget).toEqual(widgetData)
	})

	it('fetchWidget – fail', async () => {
		const { settingsStore } = await factory(false);

		(getWidget as Mock).mockRejectedValueOnce({ status: false })

		expect(settingsStore.isFetching).toBe(false)

		const promise = settingsStore.fetchWidget()

		expect(settingsStore.isFetching).toBe(true)

		await promise

		vi.runAllTimers()

		expect(settingsStore.isFetching).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(getWidget).toHaveBeenCalled()
		expect(settingsStore.widget).toEqual(null)
	})
})
