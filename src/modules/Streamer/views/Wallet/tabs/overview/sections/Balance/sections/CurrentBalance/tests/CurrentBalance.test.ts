import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import moment from 'moment'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { Locale } from '@/core/types'
import { dictData } from '@/core/api/fetchDictionary/fixtures/dictData'
import { i18n } from '@/core/i18n'
import { useAppStore, useDictStore } from '@/core/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { walletDataTochka } from '@/modules/Streamer/views/Wallet/api/getWallet/fixtures/walletData'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import CurrentBalance from '../CurrentBalance.vue'

describe('Streamer Wallet overview CurrentBalance', () => {
	const factory = () => {
		const wrapper = mount(CurrentBalance, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
		})

		const dictStore = useDictStore()
		dictStore.all = dictData

		const walletStore = useWalletStore()
		walletStore.wallet = { ...walletDataTochka, balance: 10000 } // Ensure balance is above minimum

		const streamerStore = useStreamerStore()
		streamerStore.profile = {
			language: Locale.RU, // Non-EN language for testing
		} as any

		const appStore = useAppStore()
		appStore.appLocale = Locale.RU

		return {
			wrapper,
			dictStore,
			walletStore,
			streamerStore,
			appStore,
		}
	}

	beforeAll(() => {
		vi.useFakeTimers()
	})

	beforeEach(() => {
		vi.clearAllTimers()
	})

	it('returns null for payment amount if there is no data in dict', async () => {
		const { wrapper, dictStore } = factory()

		dictStore.all = null

		await nextTick()

		expect(wrapper.vm?.minimumPaymentAmount).toBeNull()
		expect(wrapper.vm?.paymentAmount).toBeNull()
		expect(wrapper.vm?.paymentAmountLabel).toBeNull()
	})

	it('calculates minimumPaymentAmount properly', async () => {
		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.vm?.minimumPaymentAmount).not.toBeNull()
	})

	it('calculates paymentAmount properly', async () => {
		const { wrapper, walletStore } = factory()

		await nextTick()

		walletStore.wallet!.balance = 0

		expect(wrapper.vm?.paymentAmount).toBe(wrapper.vm?.minimumPaymentAmount)

		walletStore.wallet!.balance = (wrapper.vm?.minimumPaymentAmount as number) + 100

		expect(wrapper.vm?.paymentAmount).toBe(walletStore.wallet!.balance)
	})

	it('shows minimum payout label when language is EN', async () => {
		const { wrapper, streamerStore } = factory()

		streamerStore.profile!.language = Locale.EN

		await nextTick()

		expect(wrapper.vm?.paymentAmountLabel).toBe('Minimum payout amount')
	})

	it('shows minimum payout label when balance is below minimum', async () => {
		const { wrapper, walletStore } = factory()

		walletStore.wallet!.balance = 0

		await nextTick()

		expect(wrapper.vm?.paymentAmountLabel).toBe('Minimum payout amount')
	})

	it('shows next payout with different non-EN languages', async () => {
		const { wrapper, streamerStore, walletStore } = factory()

		// Test with Spanish language
		streamerStore.profile!.language = Locale.ES
		// Set balance well above minimum (minimum is 5000, so use 10000)
		walletStore.wallet!.balance = 10000

		await nextTick()

		expect(wrapper.vm?.paymentAmountLabel).toContain('Payout amount on')
	})

	it('shows next payout when balance equals minimum with non-EN language', async () => {
		const { wrapper, streamerStore, walletStore } = factory()

		streamerStore.profile!.language = Locale.RU
		// Set balance to exactly minimum amount (>= condition is still true)
		walletStore.wallet!.balance = 5000 // Use the known minimum amount

		await nextTick()

		expect(wrapper.vm?.paymentAmountLabel).toContain('Payout amount on')
	})

	it('shows minimum payout when balance is below minimum with non-EN language', async () => {
		const { wrapper, streamerStore, walletStore } = factory()

		streamerStore.profile!.language = Locale.RU
		// Set balance below minimum
		walletStore.wallet!.balance = 1000 // Below the 5000 minimum

		await nextTick()

		expect(wrapper.vm?.paymentAmountLabel).toBe('Minimum payout amount')
	})

	it('returns null when wallet is null', async () => {
		const { wrapper, walletStore } = factory()

		walletStore.wallet = null

		await nextTick()

		expect(wrapper.vm?.paymentAmountLabel).toBeNull()
	})

	it('handles null streamer profile gracefully', async () => {
		const { wrapper, streamerStore } = factory()

		streamerStore.profile = null

		await nextTick()

		// When profile is null, language is undefined, which !== Locale.EN
		// So it shows "Payout amount on" instead of "Minimum payout amount"
		expect(wrapper.vm?.paymentAmountLabel).toContain('Payout amount on')
	})

	it('shows minimum payout when language is explicitly EN', async () => {
		const { wrapper, streamerStore } = factory()

		streamerStore.profile = { language: Locale.EN } as any

		await nextTick()

		expect(wrapper.vm?.paymentAmountLabel).toBe('Minimum payout amount')
	})
})
