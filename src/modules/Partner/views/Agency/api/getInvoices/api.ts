
import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IInvoice, IInvoiceResponse } from './types'

export const getInvoices = (page: number): Promise<IPaginatedData<IInvoice[]>> => {
	return Api.get<IResponsePaginatedData<IInvoiceResponse[]>>('agency/wallet/transactions', { page }, {
		cache: {
			id: `agency-invoices-${JSON.stringify({ page })}`,
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res))
}
