import { defineStore } from 'pinia'

import { Logger } from '@/core/helpers'
import * as WalletApi from '@/modules/Streamer/views/Wallet/api'
import { type ITransactions } from '@/modules/Streamer/views/Wallet/api'

export interface ITransactionsState {
	isFetching: boolean
	payoutStatus: ITransactions['payoutStatus']
	transactions: {
		data: ITransactions['transactions']
		perPage: number
		total: number
		page: number
	}
}

export const useTransactionsStore = defineStore('transactions', {
	state: (): ITransactionsState => ({
		isFetching: false,
		payoutStatus: null,
		transactions: {
			data: [],
			perPage: 0,
			total: 0,
			page: 1,
		},
	}),

	actions: {
		async fetchTransactions (page = 1) {
			try {
				this.isFetching = true

				const res = await WalletApi.getTransactions(page)

				this.transactions.page = page

				this.payoutStatus = res.data.payoutStatus
				this.transactions.data = res.data.transactions
				this.transactions.perPage = res.perPage
				this.transactions.total = res.total
			}
			catch(err) {
				Logger.error('Error fetching user transactions', true, err)
			}
			finally {
				this.isFetching = false
			}
		},
	},
})
