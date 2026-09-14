import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'

import type { ITransactions, ITransactionsResponse } from './types'

export const responseToData = (response: IResponsePaginatedData<ITransactionsResponse>): IPaginatedData<ITransactions> => {
	return {
		status: response.status,
		data: {
			payoutStatus: Array.isArray(response.data.payout_status) ? null : response.data.payout_status,
			transactions: response.data.transactions,
		},
		perPage: response.per_page,
		total: response.total,
	}
}
