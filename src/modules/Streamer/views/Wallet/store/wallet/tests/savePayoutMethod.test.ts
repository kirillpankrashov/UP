import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { PayoutService } from '@/core/types'
import { Logger } from '@/core/helpers'
import { savePayoutMethod } from '@/modules/Streamer/views/Wallet/api'

import { useWalletStore } from '../wallet'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Wallet/api')

describe('Settings Wallet savePayoutMethod', () => {
	beforeEach(() => {
		vi.useFakeTimers()
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (fetchWallet: boolean = true) => {
		const walletStore = useWalletStore()
		if (fetchWallet) {
			await walletStore.fetchWallet()
		}

		return { walletStore }
	}

	it('savePayoutMethod – success', async () => {
		const { walletStore } = await factory(true)

		expect(walletStore.isFetching).toBe(false)

		// @ts-ignore
		const promise = walletStore.savePayoutMethod(PayoutService.TIPALTI, walletStore.payoutMethod)

		expect(walletStore.isFetching).toBe(true)

		await promise

		expect(walletStore.isFetching).toBe(false)

		expect(savePayoutMethod).toHaveBeenCalled()
	})

	it('savePayoutMethod – fail if not payout method data yet', async () => {
		const { walletStore } = await factory(false)

		expect(walletStore.isFetching).toBe(false)

		// @ts-ignore
		const promise = walletStore.savePayoutMethod(PayoutService.TIPALTI, walletStore.payoutMethod)

		expect(walletStore.isFetching).toBe(false)

		await promise

		expect(walletStore.isFetching).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(savePayoutMethod).not.toHaveBeenCalled()
	})

	it('savePayoutMethod – fail', async () => {
		const { walletStore } = await factory(true);

		(savePayoutMethod as Mock).mockRejectedValueOnce({ status: false })

		expect(walletStore.isFetching).toBe(false)

		// @ts-ignore
		const promise = walletStore.savePayoutMethod(PayoutService.TIPALTI, walletStore.payoutMethod)

		expect(walletStore.isFetching).toBe(true)

		await promise

		expect(walletStore.isFetching).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(savePayoutMethod).toHaveBeenCalled()
	})
})
