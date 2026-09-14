import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { transactionsData } from '@/modules/Streamer/views/Wallet/api/getTransactions/fixtures/transactionsData'
import { walletDataTipalti } from '@/modules/Streamer/views/Wallet/api/getWallet/fixtures/walletData'
import { useTransactionsStore, useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import History from '../History.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useCurrency: () => ({
		formatCurrency: vi.fn((amount: number) => `formatted-${amount}`),
	}),
}))

const ElTableStub = {
	name: 'ElTable',
	props: ['data'],
	template: '<div data-test="wallet-history-table"><slot /></div>',
}

const ElTableColumnStub = {
	name: 'ElTableColumn',
	template: '<div />',
}

const ElPaginationStub = {
	name: 'ElPagination',
	props: ['currentPage'],
	template: `
		<div data-test="wallet-history-pagination">
			<button data-test="pagination-next" @click="$emit('current-change', currentPage + 1)"></button>
		</div>
	`,
}

describe('Streamer Wallet History Section', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = (override?: Partial<{
		transactions: typeof transactionsData.data.transactions
		transactionsTotal: number
	}>) => {
		const transactions = override?.transactions ?? transactionsData.data.transactions
		const transactionsTotal = override?.transactionsTotal ?? transactionsData.total

		const wrapper = mount(History, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					ElTable: ElTableStub,
					ElTableColumn: ElTableColumnStub,
					ElPagination: ElPaginationStub,
				},
			},
		})

		const transactionsStore = useTransactionsStore()
		const walletStore = useWalletStore()

		// Store data setup (no initialState)
		walletStore.wallet = walletDataTipalti as any

		transactionsStore.transactions = {
			data: transactions as any,
			perPage: transactionsData.perPage,
			total: transactionsTotal,
			page: 1,
		}

		return { wrapper, transactionsStore, walletStore }
	}

	it('renders ElTable when there are transactions', async () => {
		const { wrapper } = factory()
		await nextTick()

		expect(wrapper.find('[data-test="wallet-history-table"]').exists()).toBe(true)
		expect(wrapper.text()).not.toContain('wallet.payoutHistory.noData')
	})

	it('renders no-data message when transactions are empty', async () => {
		const { wrapper } = factory({ transactions: [], transactionsTotal: 0 })
		await nextTick()

		expect(wrapper.find('[data-test="wallet-history-table"]').exists()).toBe(false)
		expect(wrapper.text()).toContain('wallet.payoutHistory.noData')
	})

	it('calls fetchTransactions with next page on pagination current-change', async () => {
		const { wrapper, transactionsStore } = factory()
		await nextTick()

		await wrapper.find('[data-test="pagination-next"]').trigger('click')
		await nextTick()

		expect(transactionsStore.fetchTransactions).toHaveBeenCalledWith(2)
	})
})

