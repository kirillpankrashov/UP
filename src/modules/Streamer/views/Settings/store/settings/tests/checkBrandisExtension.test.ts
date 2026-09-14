import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { checkBrandisExtension } from '@/modules/Streamer/views/Settings/api'

import { useSettingsStore } from '../settings'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')

const brandisData = {
	status: true,
	activation: true,
	changed: true,
}

describe('Settings Store checkBrandisExtension', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (fetchWidget: boolean = true) => {
		const settingsStore = useSettingsStore()

		if (fetchWidget) {
			await settingsStore.fetchWidget()
		}

		settingsStore.widget!.brandisExtensionEnabled = false

		return { settingsStore }
	}

	it('checkBrandisExtension – success, changed', async () => {
		const { settingsStore } = await factory()

		const promise = settingsStore.checkBrandisExtension()

		expect(settingsStore.checkingBrandisExtension).toBe(true)

		await promise

		expect(checkBrandisExtension).toHaveBeenCalled()
		const mockPromise = (checkBrandisExtension as Mock).mock.results[0]!.value as Promise<any>
		await expect(mockPromise).resolves.toStrictEqual(brandisData)
		expect(settingsStore.widget?.brandisExtensionEnabled).toBe(true)
		expect(settingsStore.checkingBrandisExtension).toBe(false)
	})

	it('checkBrandisExtension – success, not changed', async () => {
		const { settingsStore } = await factory();

		(checkBrandisExtension as Mock).mockResolvedValueOnce({
			...brandisData,
			changed: false,
		})

		const promise = settingsStore.checkBrandisExtension()

		expect(settingsStore.checkingBrandisExtension).toBe(true)

		await promise

		expect(checkBrandisExtension).toHaveBeenCalled()
		expect(settingsStore.widget?.brandisExtensionEnabled).toBe(false)
		expect(settingsStore.checkingBrandisExtension).toBe(false)
	})

	it('checkBrandisExtension – fail', async () => {
		const { settingsStore } = await factory();

		(checkBrandisExtension as Mock).mockRejectedValueOnce({ status: false })

		const promise = settingsStore.checkBrandisExtension()

		expect(settingsStore.checkingBrandisExtension).toBe(true)

		await promise

		expect(checkBrandisExtension).toHaveBeenCalled()
		expect(settingsStore.widget?.brandisExtensionEnabled).toBe(false)
		expect(Logger.error).toHaveBeenCalled()
		expect(settingsStore.checkingBrandisExtension).toBe(false)
	})
})
