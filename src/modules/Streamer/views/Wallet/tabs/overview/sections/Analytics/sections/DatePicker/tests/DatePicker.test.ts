import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import moment from 'moment'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'
import { analyticsData } from '@/modules/Streamer/views/Wallet/api/getAnalytics/fixtures/analyticsData'
import { useWalletAnalyticsStore } from '@/modules/Streamer/views/Wallet/store'

import DatePicker from '../DatePicker.vue'

describe('Streamer Wallet overview DatePicker', () => {
	const factory = () => {
		const wrapper = mount(DatePicker, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
		})
		const streamerStore = useStreamerStore()
		streamerStore.profile = profileData

		const analyticsStore = useWalletAnalyticsStore()
		analyticsStore.data = analyticsData

		return {
			wrapper,
			streamerStore,
			analyticsStore,
		}
	}

	beforeAll(() => {
		vi.useFakeTimers()
	})

	beforeEach(() => {
		vi.clearAllTimers()
	})

	it('pickerOptions computes correctly', async () => {
		const { wrapper, streamerStore } = factory()

		const signedUp = streamerStore.profile!.signedUp

		expect(wrapper.vm.pickerOptions.disabledDate(moment(signedUp).toDate())).toBe(false)

		expect(wrapper.vm.pickerOptions.disabledDate(moment(signedUp).subtract(1, 'month').toDate())).toBe(true)

		expect(wrapper.vm.pickerOptions.disabledDate(moment().add(1, 'month').toDate())).toBe(true)
	})
})
