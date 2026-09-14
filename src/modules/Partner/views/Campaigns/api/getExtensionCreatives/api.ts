import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'
import type { ICampaignsQueryParams } from '@/modules/Partner/views/Campaigns/types'

import { responseToData } from './adapter'
import type { IExtensionCreative, IExtensionCreativeResponse } from './types'

export const getExtensionCreatives = (data: ICampaignsQueryParams): Promise<IPaginatedData<IExtensionCreative[]>> => {
	return Api.get<IResponsePaginatedData<IExtensionCreativeResponse[]>>(
		'partner/campaigns/extension/ad', data, {
			cache: {
				id: `partner-extension-creatives-${new URLSearchParams(data as any).toString()}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res))
}
