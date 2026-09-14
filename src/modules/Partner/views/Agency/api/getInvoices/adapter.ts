import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'

import type { IInvoice, IInvoiceResponse } from './types'

export const responseToData = (response: IResponsePaginatedData<IInvoiceResponse[]>): IPaginatedData<IInvoice[]> => ({
	status: response.status,
	perPage: response.per_page,
	data: response.data.map((item: IInvoiceResponse) => ({
		date: item.date,
		amount: item.amount,
		currency: {
			code: item.currency.code,
			enTitle: item.currency.en_title,
			ruTitle: item.currency.ru_title,
			ptTitle: item.currency.pt_title,
			esTitle: item.currency.es_title,
			flag: item.currency.flag,
			visible: item.currency.visible,
		},
		invoice: item.invoice,
	})),
	total: response.total,
})
