import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { sendWidgetPreview } from '@/modules/Streamer/views/Referrals/api'

import { useReferralsStore } from '../referrals'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Referrals/api')

describe('Settings Store sendWidgetPreview', () => {
	beforeEach(() => {
		vi.useFakeTimers()
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (fetchReferral: boolean = true) => {
		const refeferralsStore = useReferralsStore()
		if (fetchReferral) {
			await refeferralsStore.fetchReferral()
		}

		return { refeferralsStore }
	}

	it('sendWidgetPreview – success', async () => {
		const { refeferralsStore } = await factory(true)

		expect(refeferralsStore.widgetPreview.sending).toBe(false)
		expect(refeferralsStore.widgetPreview.success).toBe(false)

		const promise = refeferralsStore.sendWidgetPreview()

		expect(refeferralsStore.widgetPreview.sending).toBe(true)
		expect(refeferralsStore.widgetPreview.success).toBe(false)

		await promise

		expect(refeferralsStore.widgetPreview.success).toBe(true)

		vi.runAllTimers()

		expect(sendWidgetPreview).toHaveBeenCalled()

		expect(refeferralsStore.widgetPreview.sending).toBe(false)
		expect(refeferralsStore.widgetPreview.success).toBe(false)
	})

	it('sendWidgetPreview – fail', async () => {
		const { refeferralsStore } = await factory();

		(sendWidgetPreview as Mock).mockRejectedValueOnce({ status: false })

		expect(refeferralsStore.widgetPreview.sending).toBe(false)
		expect(refeferralsStore.widgetPreview.success).toBe(false)

		const promise = refeferralsStore.sendWidgetPreview()

		expect(refeferralsStore.widgetPreview.sending).toBe(true)
		expect(refeferralsStore.widgetPreview.success).toBe(false)

		await promise

		expect(refeferralsStore.widgetPreview.success).toBe(false)

		vi.runAllTimers()

		expect(sendWidgetPreview).toHaveBeenCalled()

		expect(refeferralsStore.widgetPreview.sending).toBe(false)
		expect(refeferralsStore.widgetPreview.success).toBe(false)
	})
})
