import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api } from '@/core/client'

import { responseToData } from './adapter'
import type { ITransactions, ITransactionsResponse } from './types'

export const getTransactions = (page: number): Promise<IPaginatedData<ITransactions>> => {
	return Api.get<IResponsePaginatedData<ITransactionsResponse>>(
		'streamer/wallet/transactions', { page },
	).then((res) => responseToData(res))
}
