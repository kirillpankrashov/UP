import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Platform } from '@/core/types'

import { useSettingsStore } from '../settings'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')

describe('Settings Store toggleChatbot', () => {
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

	it('toggleChatbot – success', async () => {
		const { settingsStore } = await factory()

		settingsStore.widget!.platform = Platform.TWITCH
		settingsStore.widget!.nightbot.twitch.connected = true

		const spyDisconnect = vi.spyOn(settingsStore, 'disconnectChatbot')
		const spyConnect = vi.spyOn(settingsStore, 'connectChatbot')

		await settingsStore.toggleChatbot()

		expect(spyDisconnect).toHaveBeenCalled()
		expect(spyConnect).not.toHaveBeenCalled()
	})

	it('toggleChatbot – fail', async () => {
		const { settingsStore } = await factory(false)

		const spyDisconnect = vi.spyOn(settingsStore, 'disconnectChatbot')
		const spyConnect = vi.spyOn(settingsStore, 'connectChatbot')

		await settingsStore.toggleChatbot()

		expect(spyDisconnect).not.toHaveBeenCalled()
		expect(spyConnect).not.toHaveBeenCalled()
	})
})
