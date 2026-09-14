import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'

import Overview from '../Overview.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

vi.mock('@/components', () => ({
	TextLink: {
		name: 'TextLink',
		emits: ['click'],
		template: '<button data-test="overview-creators-list-link" type="button" @click="$emit(\'click\')"><slot /></button>',
	},
}))

vi.mock('@/components/layouts', () => ({
	DashboardSection: {
		name: 'DashboardSection',
		props: ['title', 'noBorder'],
		template: '<section data-test="dashboard-section"><slot /></section>',
	},
	DashboardSubsection: {
		name: 'DashboardSubsection',
		props: ['title'],
		template: '<div data-test="dashboard-subsection"><slot /></div>',
	},
}))

const toggleSidebarVisibilityMock = vi.fn()

describe('Partner Agency Overview', () => {
	const factory = (opts: {
		agencyId: number
		referralLink?: string | null
		isFetchingData?: boolean
	}) => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
			initialState: {
				'partner-agency': {
					isFetchingData: false,
					data: {
						id: opts.agencyId,
					},
				},
				'partner-agency-referral': {
					isFetchingData: opts.isFetchingData ?? false,
					referral: opts.referralLink
						? { link: opts.referralLink }
						: null,
					streamers: {
						isFetched: false,
						amount: 0,
						data: [],
					},
					history: {
						isFetched: false,
						page: 1,
						perPage: 25,
						total: 0,
						amount: 0,
						data: [],
						loading: false,
					},
					historyDetail: {
						isFetched: false,
						page: 1,
						perPage: 25,
						total: 0,
						data: [],
						loading: false,
					},
				},
			},
		})

		const wrapper = mount(Overview, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					Balance: { name: 'Balance', template: '<div data-test="overview-balance-stub" />' },
					ReferralLink: { name: 'ReferralLink', template: '<div data-test="overview-referral-link-stub" />' },
					AgencySettings: { name: 'AgencySettings', template: '<div data-test="overview-agency-settings-stub" />' },
					StreamersList: {
						name: 'StreamersList',
						template: '<div data-test="overview-streamers-list-stub" />',
						setup: (_p: any, { expose }: any) => {
							expose({
								toggleSidebarVisibility: toggleSidebarVisibilityMock,
							})
							return {}
						},
					},
				},
			},
		})

		return { wrapper }
	}

	it('does not render when agencyStore.data is null', async () => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
			initialState: {
				'partner-agency': {
					isFetchingData: false,
					data: null,
				},
				'partner-agency-referral': {
					isFetchingData: false,
					referral: null,
					streamers: { isFetched: false, amount: 0, data: [] },
					history: { isFetched: false, page: 1, perPage: 25, total: 0, amount: 0, data: [], loading: false },
					historyDetail: { isFetched: false, page: 1, perPage: 25, total: 0, data: [], loading: false },
				},
			},
		})

		const wrapper = mount(Overview, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					Balance: { name: 'Balance', template: '<div />' },
					ReferralLink: { name: 'ReferralLink', template: '<div />' },
					AgencySettings: { name: 'AgencySettings', template: '<div />' },
					StreamersList: { name: 'StreamersList', template: '<div />' },
				},
			},
		})

		await nextTick()

		expect(wrapper.find('[data-test="partner-agency-overview"]').exists()).toBe(false)
	})

	it('renders ReferralLink subsection regardless of referral link value', async () => {
		const { wrapper: w1 } = factory({ agencyId: 2, referralLink: null })
		await nextTick()
		expect(w1.find('[data-test="overview-referral-link-stub"]').exists()).toBe(true)

		const { wrapper: w2 } = factory({ agencyId: 2, referralLink: 'https://example.com/ref' })
		await nextTick()
		expect(w2.find('[data-test="overview-referral-link-stub"]').exists()).toBe(true)
	})

	it('shows AgencySettings for non-uplify agency and emits open-creators on link click', async () => {
		toggleSidebarVisibilityMock.mockReset()
		const { wrapper } = factory({ agencyId: 2, referralLink: null })
		await nextTick()

		expect(wrapper.find('[data-test="overview-agency-settings-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="overview-streamers-list-stub"]').exists()).toBe(false)

		await wrapper.find('[data-test="overview-creators-list-link"]').trigger('click')

		expect(wrapper.emitted('open-creators')).toBeTruthy()
		expect(toggleSidebarVisibilityMock).not.toHaveBeenCalled()
	})

	it('shows StreamersList for uplify agency and opens sidebar on link click', async () => {
		toggleSidebarVisibilityMock.mockReset()
		const { wrapper } = factory({ agencyId: 1, referralLink: null })
		await nextTick()

		expect(wrapper.find('[data-test="overview-agency-settings-stub"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="overview-streamers-list-stub"]').exists()).toBe(true)

		await wrapper.find('[data-test="overview-creators-list-link"]').trigger('click')

		expect(wrapper.emitted('open-creators')).toBeFalsy()
		expect(toggleSidebarVisibilityMock).toHaveBeenCalledTimes(1)
	})
})

