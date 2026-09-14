import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useReferralsStore } from '@/modules/Streamer/views/Referrals/store'
import { analyticsData } from '@/modules/Streamer/views/Wallet/api/getAnalytics/fixtures/analyticsData'
import { transactionsData } from '@/modules/Streamer/views/Wallet/api/getTransactions/fixtures/transactionsData'
import { walletDataTipalti } from '@/modules/Streamer/views/Wallet/api/getWallet/fixtures/walletData'
import { useTransactionsStore, useWalletAnalyticsStore, useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import Wallet from '../Wallet.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

vi.mock('@vueuse/core', () => ({
	useTitle: vi.fn(),
}))

const DashboardLayoutStub = {
	name: 'DashboardLayout',
	template: '<div data-test="dashboard-layout"><slot /></div>',
	props: ['fullWidth', 'id'],
}

const DashboardTitleStub = {
	name: 'DashboardTitle',
	props: ['title'],
	template: '<div data-test="dashboard-title">{{ title }}</div>',
}

const ElTabsStub = {
	name: 'ElTabs',
	props: ['modelValue'],
	emits: ['update:modelValue'],
	template: '<div data-test="el-tabs"><slot /></div>',
}

const ElTabPaneStub = {
	name: 'ElTabPane',
	props: ['name', 'label'],
	template: '<div data-test="el-tab-pane"><slot /></div>',
}

describe('Streamer Wallet View', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const mountWithStores = (setup: (stores: {
		walletStore: ReturnType<typeof useWalletStore>
		referralsStore: ReturnType<typeof useReferralsStore>
		transactionsStore: ReturnType<typeof useTransactionsStore>
		analyticsStore: ReturnType<typeof useWalletAnalyticsStore>
	}) => void) => {
		const pinia = createTestingPinia({ createSpy: vi.fn })

		const walletStore = useWalletStore(pinia as any)
		const referralsStore = useReferralsStore(pinia as any)
		const transactionsStore = useTransactionsStore(pinia as any)
		const analyticsStore = useWalletAnalyticsStore(pinia as any)

		setup({ walletStore, referralsStore, transactionsStore, analyticsStore })

		const wrapper = mount(Wallet, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					DashboardLayout: DashboardLayoutStub,
					DashboardTitle: DashboardTitleStub,
					ElTabs: ElTabsStub,
					ElTabPane: ElTabPaneStub,
					Balance: { name: 'Balance', template: '<div data-test="wallet-balance-stub" />' },
					Services: { name: 'Services', template: '<div data-test="wallet-services-stub" />' },
					Analytics: { name: 'Analytics', template: '<div data-test="wallet-analytics-stub" />' },
					History: { name: 'History', template: '<div data-test="wallet-history-stub" />' },
				},
			},
		})

		return { wrapper, walletStore, referralsStore, transactionsStore, analyticsStore }
	}

	it('calls fetch actions on beforeMount when data is missing', async () => {
		const { walletStore, referralsStore, transactionsStore, analyticsStore } = mountWithStores(({ walletStore, referralsStore, transactionsStore, analyticsStore }) => {
			walletStore.wallet = null
			referralsStore.referral = null as any
			transactionsStore.transactions.data = []
			analyticsStore.data = []
		})

		await nextTick()

		expect(walletStore.fetchWallet).toHaveBeenCalled()
		expect(referralsStore.fetchReferral).toHaveBeenCalled()
		expect(transactionsStore.fetchTransactions).toHaveBeenCalled()
		expect(analyticsStore.fetchAnalytics).toHaveBeenCalled()
	})

	it('does not call fetch actions on beforeMount when data already exists', async () => {
		const { walletStore, referralsStore, transactionsStore, analyticsStore } = mountWithStores(({ walletStore, referralsStore, transactionsStore, analyticsStore }) => {
			walletStore.wallet = walletDataTipalti as any
			referralsStore.referral = { available: true } as any
			transactionsStore.transactions.data = transactionsData.data.transactions as any
			analyticsStore.data = analyticsData.slice(0, 2) as any
		})

		await nextTick()

		expect(walletStore.fetchWallet).not.toHaveBeenCalled()
		expect(referralsStore.fetchReferral).not.toHaveBeenCalled()
		expect(transactionsStore.fetchTransactions).not.toHaveBeenCalled()
		expect(analyticsStore.fetchAnalytics).not.toHaveBeenCalled()
	})
})

