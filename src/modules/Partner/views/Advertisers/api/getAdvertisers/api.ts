import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { IAdvertiser, IAdvertiserResponse } from './types'

export const getAdvertisers = (): Promise<IAdvertiser[]> => {
	return Api.get<IResponseData<IAdvertiserResponse[]>>(
		'partner/advertisers',
		{},
		{
			cache: {
				id: 'partner-advertisers',
				ttl: CacheTTL.ONE_DAY,
			},
		},
	)
		.then(res => responseToData(res.data))
}
