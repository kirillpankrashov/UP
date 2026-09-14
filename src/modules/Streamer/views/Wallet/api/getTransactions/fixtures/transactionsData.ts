import moment from 'moment'

import { CurrencyIcon, CurrencyName, PayoutStatus } from '@/core/types'
import type { IPaginatedData } from '@/core/types/response'

import type { ITransactions } from '../types'

const _generateTransactions = () => {
	const transactions: ITransactions['transactions'] = []

	for (let i = 1; i < 10; i++) {
		transactions.push({
			amount: 1000,
			currency: {
				code: CurrencyName.USD,
				en_title: '',
				es_title: '',
				flag: CurrencyIcon.USD,
				pt_title: '',
				ru_title: '',
				visible: true,
			},
			date: moment().subtract(i * 7, 'week').format('DD.MM.YYYY'),
			invoice: null,
			receipt: null,
			service: null,
		})
	}

	return transactions
}

export const transactionsData: IPaginatedData<ITransactions> = {
	data: {
		payoutStatus: {
			amount: 10000,
			created: new Date(),
			status: PayoutStatus.DONE,
		},
		transactions: _generateTransactions(),
	},
	perPage: 10,
	total: 10,
	status: true,
}
