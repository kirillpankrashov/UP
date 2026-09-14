import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useAppStore } from '@/core/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'
import { historyData } from '@/modules/Streamer/views/Referrals/api/getHistory/fixtures/historyData'
import { useReferralsHistoryStore } from '@/modules/Streamer/views/Referrals/store'

import History from '../History.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Referrals History', () => {
	const factory = () => {
		const wrapper = mount(History, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: ['router-link'],
			},
		})

		const appStore = useAppStore()
		const streamerStore = useStreamerStore()
		streamerStore.profile = profileData

		const referralsHistoryStore = useReferralsHistoryStore()

		referralsHistoryStore.history.data = historyData.data
		referralsHistoryStore.history.total = 50
		referralsHistoryStore.history.perPage = 10

		return { wrapper, appStore, streamerStore, referralsHistoryStore }
	}

	it('renders correctly when history data is available', async () => {
		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.find('[data-test="referrals-history-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="referrals-history-table"]').exists()).toBe(true)
	})

	it('displays empty message when no history data is available', async () => {
		const { wrapper, referralsHistoryStore } = factory()
		referralsHistoryStore.history.data = []

		await nextTick()

		expect(wrapper.find('[data-test="referrals-history-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="referrals-history-table"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="referrals-history-empty"]').exists()).toBe(true)
	})

	it('calls fetchHistory on mount if history is empty', async () => {
		const { referralsHistoryStore } = factory()
		referralsHistoryStore.history.data = []

		await nextTick()

		expect(referralsHistoryStore.fetchHistory).toHaveBeenCalled()
	})
})
