import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	IExtensionAdset,
	IExtensionAdsetResponse,
} from './types'

export const getExtensionAdset = (slug: string): Promise<IExtensionAdset> => {
	return Api.get<IResponseData<IExtensionAdsetResponse>>(
		'partner/campaigns/extension/ad-set/info', { slug }, {
			cache: {
				id: `partner-extension-adset-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		})
		.then(res => responseToData(res.data))
}
