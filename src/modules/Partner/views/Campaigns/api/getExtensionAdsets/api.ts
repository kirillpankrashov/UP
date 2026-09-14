import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'
import type { ICampaignsQueryParams } from '@/modules/Partner/views/Campaigns/types'

import { responseToData } from './adapter'
import type { IExtensionAdset, IExtensionAdsetResponse } from './types'

export const getExtensionAdsets = (data: ICampaignsQueryParams): Promise<IPaginatedData<IExtensionAdset[]>> => {
	return Api.get<IResponsePaginatedData<IExtensionAdsetResponse[]>>(
		'partner/campaigns/extension/ad-set', data, {
			cache: {
				id: `partner-extension-adsets-${new URLSearchParams(data as any).toString()}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res))
}
