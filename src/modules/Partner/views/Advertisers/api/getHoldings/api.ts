import type { IHolding } from '@/core/types'
import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

export const getHoldings = (): Promise<IHolding[]> => {
	return Api.get<IResponseData<IHolding[]>>(
		'partner/holdings',
		{},
		{
			cache: {
				id: 'partner-holdings',
				ttl: CacheTTL.ONE_DAY,
			},
		},
	)
		.then(res => res.data)
}
