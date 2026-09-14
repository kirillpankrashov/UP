import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { getWallet } from '@/modules/Streamer/views/Wallet/api'
import { walletDataTipalti } from '@/modules/Streamer/views/Wallet/api/getWallet/fixtures/walletData'

import { useWalletStore } from '../wallet'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Wallet/api')

describe('Settings Wallet fetchWallet', () => {
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

	it('fetchWallet – success', async () => {
		const { walletStore } = await factory(false)

		expect(walletStore.isFetching).toBe(false)

		const promise = walletStore.fetchWallet()

		expect(walletStore.isFetching).toBe(true)

		await promise

		expect(walletStore.isFetching).toBe(false)

		expect(getWallet).toHaveBeenCalled()
		expect(walletStore.wallet).toEqual(walletDataTipalti)
	})

	it('fetchWallet – fail', async () => {
		const { walletStore } = await factory(false);

		(getWallet as Mock).mockRejectedValueOnce({ status: false })

		expect(walletStore.isFetching).toBe(false)

		const promise = walletStore.fetchWallet()

		expect(walletStore.isFetching).toBe(true)

		await promise

		expect(walletStore.isFetching).toBe(false)

		expect(Logger.error).toHaveBeenCalled()
		expect(getWallet).toHaveBeenCalled()
		expect(walletStore.wallet).toEqual(null)
	})
})
