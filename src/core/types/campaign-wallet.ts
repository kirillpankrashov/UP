import type { CurrencyIcon, ICurrencyDict, ICurrencyDictResponse } from '@/core/types'

export interface ICampaignWalletResponse {
	balance: number
	currency: ICurrencyDictResponse
	icon: CurrencyIcon
}

export interface ICampaignWallet {
	balance: number
	currency: ICurrencyDict
	icon: CurrencyIcon
}
