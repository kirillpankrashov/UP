import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { checkExtension } from '@/modules/Streamer/views/Settings/api'

import { useSettingsStore } from '../settings'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')

const extensionData = {
	status: true,
	activation: true,
	changed: true,
}

describe('Settings Store checkExtension', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (fetchWidget: boolean = true) => {
		const settingsStore = useSettingsStore()

		if (fetchWidget) {
			await settingsStore.fetchWidget()
		}

		settingsStore.widget!.extensionEnabled = false

		return { settingsStore }
	}

	it('checkExtension – success, changed', async () => {
		const { settingsStore } = await factory()

		const promise = settingsStore.checkExtension()

		expect(settingsStore.checkingExtension).toBe(true)

		await promise

		expect(checkExtension).toHaveBeenCalled()
		const mockPromise = (checkExtension as Mock).mock.results[0]!.value as Promise<any>
		await expect(mockPromise).resolves.toStrictEqual(extensionData)
		expect(settingsStore.widget?.extensionEnabled).toBe(true)
		expect(settingsStore.checkingExtension).toBe(false)
	})

	it('checkExtension – success, not changed', async () => {
		const { settingsStore } = await factory();

		(checkExtension as Mock).mockResolvedValueOnce({
			...extensionData,
			changed: false,
		})

		const promise = settingsStore.checkExtension()

		expect(settingsStore.checkingExtension).toBe(true)

		await promise

		expect(checkExtension).toHaveBeenCalled()
		expect(settingsStore.widget?.extensionEnabled).toBe(false)
		expect(settingsStore.checkingExtension).toBe(false)
	})

	it('checkExtension – fail', async () => {
		const { settingsStore } = await factory();

		(checkExtension as Mock).mockRejectedValueOnce({ status: false })

		const promise = settingsStore.checkExtension()

		expect(settingsStore.checkingExtension).toBe(true)

		await promise

		expect(checkExtension).toHaveBeenCalled()
		expect(settingsStore.widget?.extensionEnabled).toBe(false)
		expect(Logger.error).toHaveBeenCalled()
		expect(settingsStore.checkingExtension).toBe(false)
	})
})
