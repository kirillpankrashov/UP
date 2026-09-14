import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { RouteName } from '@/modules/Streamer/router'
import { connectChatbot } from '@/modules/Streamer/views/Settings/api'

import { useSettingsStore } from '../settings'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')

describe('Settings Store connectChatbot', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	global.window = Object.create(window)
	Object.defineProperty(window, 'location', {
		value: {
			href: RouteName.SETTINGS,
		},
		writable: true,
	})

	const factory = async (fetchWidget: boolean = true) => {
		const settingsStore = useSettingsStore()
		if (fetchWidget) {
			await settingsStore.fetchWidget()
		}

		return { settingsStore }
	}

	it('connectChatbot – success', async () => {
		window.location.href = RouteName.SETTINGS

		const { settingsStore } = await factory()

		const promise = settingsStore.connectChatbot()

		expect(settingsStore.togglingChatbot).toBe(true)

		await promise

		expect(connectChatbot).toHaveBeenCalled()
		expect(window.location.href).toBe('/some-route')
		expect(settingsStore.togglingChatbot).toBe(false)
	})

	it('connectChatbot – fail', async () => {
		window.location.href = RouteName.SETTINGS

		const { settingsStore } = await factory();

		(connectChatbot as Mock).mockRejectedValueOnce({ status: false })

		const promise = settingsStore.connectChatbot()

		expect(settingsStore.togglingChatbot).toBe(true)

		await promise

		expect(connectChatbot).toHaveBeenCalled()
		expect(window.location.href).toBe(RouteName.SETTINGS)
		expect(Logger.error).toHaveBeenCalled()
		expect(settingsStore.togglingChatbot).toBe(false)
	})
})
