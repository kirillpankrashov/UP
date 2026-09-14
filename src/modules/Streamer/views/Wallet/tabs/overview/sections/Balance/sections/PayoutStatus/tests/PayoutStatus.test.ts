import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import moment from 'moment'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { PayoutService, PayoutStatus as TransactionsPayoutStatus } from '@/core/types'
import { i18n } from '@/core/i18n'
import { transactionsData } from '@/modules/Streamer/views/Wallet/api/getTransactions/fixtures/transactionsData'
import { walletDataTochka } from '@/modules/Streamer/views/Wallet/api/getWallet/fixtures/walletData'
import { useTransactionsStore, useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import PayoutStatus from '../PayoutStatus.vue'

describe('Streamer Wallet overview PayoutStatus', () => {
	const factory = () => {
		const wrapper = mount(PayoutStatus, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
		})

		const walletStore = useWalletStore()
		walletStore.wallet = walletDataTochka
		walletStore.payoutMethod = walletDataTochka.methods[0]

		const transactionsStore = useTransactionsStore()
		transactionsStore.transactions.data = transactionsData.data.transactions
		transactionsStore.payoutStatus = transactionsData.data.payoutStatus

		return {
			wrapper,
			walletStore,
			transactionsStore,
		}
	}

	beforeAll(() => {
		vi.useFakeTimers()
	})

	beforeEach(() => {
		vi.clearAllTimers()
	})

	it('statusLabel computes correctly', async () => {
		const { wrapper, transactionsStore } = factory()

		transactionsStore.payoutStatus!.status = TransactionsPayoutStatus.SIGNED
		expect(wrapper.vm.statusLabel).toEqual(['warn', 'In progress'])

		transactionsStore.payoutStatus!.status = TransactionsPayoutStatus.IN_PROGRESS
		expect(wrapper.vm.statusLabel).toEqual(['warn', 'In progress'])

		transactionsStore.payoutStatus!.status = TransactionsPayoutStatus.ERROR
		expect(wrapper.vm.statusLabel).toEqual(['danger', 'Error'])

		transactionsStore.payoutStatus!.status = TransactionsPayoutStatus.REVERSE
		expect(wrapper.vm.statusLabel).toEqual(['danger', 'Error'])

		transactionsStore.payoutStatus!.status = TransactionsPayoutStatus.DONE
		expect(wrapper.vm.statusLabel).toEqual(['success', 'Success'])
	})

	it('isVisible computes correctly', async () => {
		const { wrapper, walletStore, transactionsStore } = factory()

		await nextTick()

		expect(wrapper.vm.isVisible).toBe(true)
		expect(wrapper.find('[data-test="wallet-balance-payout-status"]').exists()).toBe(true)

		walletStore.payoutMethod!.slug = PayoutService.RAZOR_PAY

		await nextTick()

		expect(wrapper.vm.isVisible).toBe(false)
		expect(wrapper.find('[data-test="wallet-balance-payout-status"]').exists()).toBe(false)

		walletStore.payoutMethod!.slug = PayoutService.TOCHKA_BANK

		await nextTick()

		transactionsStore.payoutStatus = null
		expect(wrapper.vm.isVisible).toBe(false)
	})

	it('paymentDay computes correctly', async () => {
		const { wrapper, transactionsStore } = factory()

		await nextTick()

		expect(wrapper.find('[data-test="wallet-balance-payout-payment-day"]').text()).toBe(moment(transactionsStore.payoutStatus?.created).format('L'))
	})
})
