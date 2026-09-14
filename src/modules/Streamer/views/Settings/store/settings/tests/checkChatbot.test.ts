import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { checkChatbot } from '@/modules/Streamer/views/Settings/api'

import { useSettingsStore } from '../settings'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')

describe('Settings Store checkChatbot', () => {
	beforeEach(() => {
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

	it('checkChatbot – success', async () => {
		const { settingsStore } = await factory()

		const fetchWidgetSpy = vi.spyOn(settingsStore, 'fetchWidget')

		const promise = settingsStore.checkChatbot()

		expect(settingsStore.checkingChatbot).toBe(true)

		await promise

		expect(checkChatbot).toHaveBeenCalled()
		expect(fetchWidgetSpy).toHaveBeenCalled()
		expect(settingsStore.checkingChatbot).toBe(false)
	})

	it('checkChatbot – fail', async () => {
		const { settingsStore } = await factory()

		const fetchWidgetSpy = vi.spyOn(settingsStore, 'fetchWidget');

		(checkChatbot as Mock).mockRejectedValueOnce({ status: false })

		const promise = settingsStore.checkChatbot()

		expect(settingsStore.checkingChatbot).toBe(true)

		await promise

		expect(checkChatbot).toHaveBeenCalled()
		expect(fetchWidgetSpy).not.toHaveBeenCalled()
		expect(Logger.error).toHaveBeenCalled()
		expect(settingsStore.checkingChatbot).toBe(false)
	})
})
