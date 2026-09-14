import type { CurrencyIcon, CurrencyName } from '@/core/types'

export interface IWalletResponse {
	balance: number
	currency: CurrencyName
	icon: CurrencyIcon
}

export interface IWallet {
	balance: number
	currency: CurrencyName
	icon: CurrencyIcon
}