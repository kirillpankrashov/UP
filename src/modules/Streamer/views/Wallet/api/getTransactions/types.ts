import type { ICurrencyDictResponse, PayoutStatus } from '@/core/types'

export interface ITransactionsResponse {
	payout_status: {
		status: PayoutStatus
		amount: number
		created: Date
	} | []
	transactions: Array<{
		date: string
		amount: number
		currency: ICurrencyDictResponse
		service: string | null
		receipt: string | null
		invoice: string | null
	}>
}

export interface ITransactions {
	payoutStatus: {
		status: PayoutStatus
		amount: number
		created: Date
	} | null
	transactions: Array<{
		date: string
		amount: number
		currency: ICurrencyDictResponse
		service: string | null
		receipt: string | null
		invoice: string | null
	}>
}
