import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { referralsData } from '@/modules/Streamer/views/Referrals/api/getReferral/fixtures/referralsData'
import { useReferralsStore } from '@/modules/Streamer/views/Referrals/store'

import Referrals from '../Referrals.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

vi.mock('@vueuse/core', () => ({
	useTitle: vi.fn(),
}))

describe('Streamer Referrals Referrals', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = (referral: any) => {
		const wrapper = mount(Referrals, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							referrals: {
								referral,
							},
						},
					}),
				],
				stubs: {
					'router-link': true,
					DashboardLayout: {
						name: 'DashboardLayout',
						template: '<div data-test="dashboard-layout"><slot /></div>',
						props: ['fullWidth', 'id'],
					},
					DashboardTitle: {
						name: 'DashboardTitle',
						template: '<div data-test="dashboard-title">{{ title }}</div>',
						props: ['title'],
					},
					Invite: {
						name: 'Invite',
						template: '<div data-test="referrals-invite-stub" />',
					},
					Promotion: {
						name: 'Promotion',
						template: '<div data-test="referrals-promotion-stub" />',
					},
					Panels: {
						name: 'Panels',
						template: '<div data-test="referrals-panels-stub" />',
					},
					History: {
						name: 'History',
						template: '<div data-test="referrals-history-stub" />',
					},
				},
			},
		})

		const referralsStore = useReferralsStore()
		return { wrapper, referralsStore }
	}

	it('renders unavailable text when referral is null', async () => {
		const { wrapper } = factory(null)

		await nextTick()

		expect(wrapper.text()).toContain('referrals.unavailable')
		expect(wrapper.find('[data-test="referrals-invite-stub"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="referrals-promotion-stub"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="referrals-panels-stub"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="referrals-history-stub"]').exists()).toBe(false)
	})

	it('calls fetchReferral on mount when referral is null', async () => {
		const { referralsStore } = factory(null)

		await nextTick()

		expect(referralsStore.fetchReferral).toHaveBeenCalled()
	})

	it('renders referral sections when referral exists', async () => {
		const { wrapper } = factory(referralsData)

		await nextTick()

		expect(wrapper.find('[data-test="referrals-invite-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="referrals-promotion-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="referrals-panels-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="referrals-history-stub"]').exists()).toBe(true)
		expect(wrapper.text()).not.toContain('referrals.unavailable')
	})

	it('passes correct title to DashboardTitle', async () => {
		const { wrapper } = factory(referralsData)

		await nextTick()

		expect(wrapper.find('[data-test="dashboard-title"]').text()).toBe('referrals.header.title')
	})
})

