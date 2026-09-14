import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CurrencyName } from '@/core/types'
import { i18n } from '@/core/i18n'
import { useAgencyReferralStore, useAgencyStore, useAgencyStreamersStore } from '@/modules/Partner/views/Agency/store'

import Balance from '../Balance.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useCurrency: () => ({
		formatCurrency: (value: any, _withCents = false, currency: any) => `FMT-${value}-${String(currency).toUpperCase()}`,
	}),
}))

vi.mock('@/components', () => ({
	// Balance imports StatCard directly from '@/components', so we stub it here.
	StatCard: {
		name: 'StatCard',
		props: ['label', 'value', 'loading'],
		template: '<div data-test="stat-card" :data-loading="String(loading)"><span data-test="stat-label">{{ label }}</span><span data-test="stat-value">{{ value }}</span></div>',
	},
}))

describe('Partner Agency Overview Balance', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = (state: {
		isUplifyAgency: boolean
		agencyWallet?: { balance: number; currency: CurrencyName } | null
		referral?: { link: string; invited: number; balance: number; currency: CurrencyName } | null
		streamersTotal: number
	}) => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		})

		const agencyStore = useAgencyStore(pinia)
		const agencyStreamersStore = useAgencyStreamersStore(pinia)
		const referralStore = useAgencyReferralStore(pinia)

		agencyStreamersStore.streamers.total = state.streamersTotal

		if (state.isUplifyAgency) {
			agencyStore.data = {
				id: 1,
				wallet: null as any,
			} as any
			referralStore.referral.data = state.referral ?? null
		}
		else {
			agencyStore.data = {
				id: 2,
				wallet: state.agencyWallet ?? null,
			} as any
			referralStore.referral.data = state.referral ?? null
		}

		const wrapper = mount(Balance, {
			global: {
				plugins: [i18n, pinia],
				stubs: {},
			},
		})

		return { wrapper, agencyStore, agencyStreamersStore, referralStore }
	}

	it('renders streamer totals + agency wallet balance when not uplify', async () => {
		const { wrapper, agencyStore, agencyStreamersStore, referralStore } = factory({
			isUplifyAgency: false,
			agencyWallet: { balance: 100, currency: CurrencyName.USD },
			referral: null,
			streamersTotal: 7,
		})

		await nextTick()

		const cards = wrapper.findAll('[data-test="stat-card"]')
		expect(cards).toHaveLength(2)

		expect(cards[0].find('[data-test="stat-label"]').text()).toBe('creators.invite.invited')
		expect(cards[0].find('[data-test="stat-value"]').text()).toBe('7')
		expect(cards[0].attributes('data-loading')).toBe('false')

		expect(cards[1].find('[data-test="stat-label"]').text()).toBe('creators.invite.amount')
		expect(cards[1].find('[data-test="stat-value"]').text()).toBe('FMT-100-USD')
		expect(cards[1].attributes('data-loading')).toBe('false')

		expect(agencyStore.fetchData).toHaveBeenCalledTimes(1)
		expect(agencyStreamersStore.fetchStreamers).toHaveBeenCalledTimes(1)
		expect(referralStore.fetchReferral).not.toHaveBeenCalled()
	})

	it('renders streamer totals + zero balance when agency wallet is missing (not uplify)', async () => {
		const { wrapper } = factory({
			isUplifyAgency: false,
			agencyWallet: null,
			referral: null,
			streamersTotal: 3,
		})

		await nextTick()

		const cards = wrapper.findAll('[data-test="stat-card"]')
		expect(cards).toHaveLength(2)
		expect(cards[0].find('[data-test="stat-value"]').text()).toBe('3')
		expect(cards[1].find('[data-test="stat-value"]').text()).toBe('FMT-0-UNDEFINED')
	})

	it('renders referral invited + referral balance when uplify', async () => {
		const { wrapper, agencyStore, agencyStreamersStore, referralStore } = factory({
			isUplifyAgency: true,
			referral: { link: 'https://example.com/ref', invited: 11, balance: 50, currency: CurrencyName.USD },
			streamersTotal: 0,
		})

		await nextTick()

		const cards = wrapper.findAll('[data-test="stat-card"]')
		expect(cards).toHaveLength(2)

		expect(cards[0].find('[data-test="stat-value"]').text()).toBe('11')
		expect(cards[1].find('[data-test="stat-value"]').text()).toBe('FMT-50-USD')

		expect(referralStore.fetchReferral).toHaveBeenCalledTimes(1)
		expect(agencyStreamersStore.fetchStreamers).not.toHaveBeenCalled()
		expect(agencyStore.fetchData).not.toHaveBeenCalled()
	})

	it('renders zero invited and zero balance when uplify referral is null', async () => {
		const { wrapper } = factory({
			isUplifyAgency: true,
			referral: null,
			streamersTotal: 0,
		})

		await nextTick()

		const cards = wrapper.findAll('[data-test="stat-card"]')
		expect(cards).toHaveLength(2)
		expect(cards[0].find('[data-test="stat-value"]').text()).toBe('0')
		expect(cards[1].find('[data-test="stat-value"]').text()).toBe('FMT-0-UNDEFINED')
	})
})

