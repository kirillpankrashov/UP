import { defineStore } from 'pinia'

import {
	type IRazorPayUser,
	type IStreamerPayoutPayload,
	type IStreamerWallet,
	type IStreamerWalletPayoutMethod,
	type ITipaltiUser,
	type ITochkaBankUser,
	PayoutService,
	RazorPayPayoutMode,
} from '@/core/types'
import { Logger } from '@/core/helpers'
import * as WalletApi from '@/modules/Streamer/views/Wallet/api'

export interface IWalletState {
	isFetching: boolean
	wallet: null | IStreamerWallet
	payoutMethod: null | IStreamerWalletPayoutMethod
}

export const useWalletStore = defineStore('wallet', {
	state: (): IWalletState => ({
		isFetching: false,
		wallet: null,
		payoutMethod: null,
	}),

	actions: {
		async fetchWallet () {
			try {
				this.isFetching = true
				const res = await WalletApi.getWallet()
				this.wallet = res
				this.payoutMethod = res.methods.find(method => method.visible) || null
			}
			catch(err) {
				Logger.error('Error fetching user wallet', true, err)
			}
			finally {
				this.isFetching = false
			}
		},

		async savePayoutMethod (method: PayoutService, model: IStreamerPayoutPayload) {
			if (!this.payoutMethod) {
				Logger.error('There is no payout method data yet', true)
				return
			}

			try {
				this.isFetching = true

				switch (method) {
					case PayoutService.RAZOR_PAY:
						await WalletApi.savePayoutMethod(PayoutService.RAZOR_PAY, model as IRazorPayUser)
						break
					case PayoutService.TIPALTI:
						await WalletApi.savePayoutMethod(PayoutService.TIPALTI, model as ITipaltiUser)
						break
					case PayoutService.TOCHKA_BANK:
						await WalletApi.savePayoutMethod(PayoutService.TOCHKA_BANK, model as ITochkaBankUser)
						break
					default:
						throw new Error('Unsupported payout service')
				}
			}
			catch(err) {
				Logger.error('Error saving payout method', true, err)
			}
			finally {
				this.isFetching = false
			}
		},
	},

	getters: {
		isPayable(state) {
			if (!state.payoutMethod) return null

			if (state.payoutMethod.slug === PayoutService.RAZOR_PAY) {
				const paymentMethod = state.payoutMethod.payload.payoutMode
				const payload = state.payoutMethod.payload

				if (paymentMethod === RazorPayPayoutMode.UPI) {
					return payload.accountVpa &&
						payload.fullName &&
						payload.birthday &&
						payload.phone &&
						payload.email &&
						payload.address &&
						payload.numberIdentification &&
						payload.payoutMode
				}

				return payload.bankIfsc &&
					payload.beneficiaryAccountNumber &&
					payload.fullName &&
					payload.birthday &&
					payload.phone &&
					payload.email &&
					payload.address &&
					payload.numberIdentification &&
					payload.payoutMode
			}

			if (state.payoutMethod.slug === PayoutService.TOCHKA_BANK) {
				const payload = state.payoutMethod.payload

				return payload.name &&
					payload.lastName &&
					payload.middleName &&
					payload.personalCode &&
					payload.accountNumber &&
					payload.routingNumber &&
					payload.selfEmployed
			}
		},
	},
})
