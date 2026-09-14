import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { disconnectChatbot } from '@/modules/Streamer/views/Settings/api'

import { useSettingsStore } from '../settings'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')

describe('Settings Store disconnectChatbot', () => {
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

	it('disconnectChatbot – success', async () => {
		const { settingsStore } = await factory()

		const fetchWidgetSpy = vi.spyOn(settingsStore, 'fetchWidget')

		const promise = settingsStore.disconnectChatbot()

		expect(settingsStore.togglingChatbot).toBe(true)

		await promise

		expect(disconnectChatbot).toHaveBeenCalled()
		expect(fetchWidgetSpy).toHaveBeenCalled()
		expect(settingsStore.togglingChatbot).toBe(false)
	})

	it('disconnectChatbot – fail', async () => {
		const { settingsStore } = await factory()

		const fetchWidgetSpy = vi.spyOn(settingsStore, 'fetchWidget');

		(disconnectChatbot as Mock).mockRejectedValueOnce({ status: false })

		const promise = settingsStore.disconnectChatbot()

		expect(settingsStore.togglingChatbot).toBe(true)

		await promise

		expect(disconnectChatbot).toHaveBeenCalled()
		expect(fetchWidgetSpy).not.toHaveBeenCalled()
		expect(Logger.error).toHaveBeenCalled()
		expect(settingsStore.togglingChatbot).toBe(false)
	})
})
