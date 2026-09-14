import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { useCampaignAnalyticsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Settings/api')
vi.mock('@/modules/Streamer/views/Campaigns/api')

describe('Campaign Analytics Store closeAnalytics', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (fetchWidget: boolean = true) => {
		const settingsStore = useSettingsStore()
		const analyticsStore = useCampaignAnalyticsStore()

		if (fetchWidget) {
			await settingsStore.fetchWidget()
		}

		return {
			analyticsStore,
			settingsStore,
		}
	}

	it('successfully closes analytics and resets state', async () => {
		const { analyticsStore } = await factory()

		// Устанавливаем начальное состояние
		analyticsStore.isActive = true
		analyticsStore.currentAdset = brandAwarenessCustomAdset
		analyticsStore.campaignDates = [new Date('2024-01-01'), new Date('2024-12-31')]
		analyticsStore.currentDates = [new Date('2024-01-01'), new Date('2024-12-31')]

		analyticsStore.closeAnalytics()

		expect(analyticsStore.isActive).toBe(false)
		expect(analyticsStore.currentAdset).toBeNull()
		expect(analyticsStore.campaignDates).toEqual([expect.any(Date), expect.any(Date)])
		expect(analyticsStore.currentDates).toEqual([expect.any(Date), expect.any(Date)])
	})

	it('resets dates to new Date instances', async () => {
		const { analyticsStore } = await factory()

		const beforeClose = new Date()
		analyticsStore.closeAnalytics()
		const afterClose = new Date()

		// Проверяем что даты были сброшены на новые инстансы Date
		expect(analyticsStore.campaignDates[0].getTime()).toBeGreaterThanOrEqual(beforeClose.getTime())
		expect(analyticsStore.campaignDates[0].getTime()).toBeLessThanOrEqual(afterClose.getTime())
		expect(analyticsStore.campaignDates[1].getTime()).toBeGreaterThanOrEqual(beforeClose.getTime())
		expect(analyticsStore.campaignDates[1].getTime()).toBeLessThanOrEqual(afterClose.getTime())
	})

	it('can be called multiple times safely', async () => {
		const { analyticsStore } = await factory()

		analyticsStore.closeAnalytics()

		expect(analyticsStore.isActive).toBe(false)
		expect(analyticsStore.currentAdset).toBeNull()
		expect(analyticsStore.campaignDates).toEqual([expect.any(Date), expect.any(Date)])
		expect(analyticsStore.currentDates).toEqual([expect.any(Date), expect.any(Date)])

		// Второй вызов не должен вызывать ошибок
		expect(() => analyticsStore.closeAnalytics()).not.toThrow()
	})

	it('resets state even if it was partially initialized', async () => {
		const { analyticsStore } = await factory()

		// Устанавливаем частичное состояние
		analyticsStore.isActive = true
		analyticsStore.currentAdset = brandAwarenessCustomAdset
		// Оставляем даты по умолчанию

		analyticsStore.closeAnalytics()

		expect(analyticsStore.isActive).toBe(false)
		expect(analyticsStore.currentAdset).toBeNull()
		expect(analyticsStore.campaignDates).toEqual([expect.any(Date), expect.any(Date)])
		expect(analyticsStore.currentDates).toEqual([expect.any(Date), expect.any(Date)])
	})
})
