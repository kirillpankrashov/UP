import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	IExtensionCreative,
	IExtensionCreativeResponse,
} from './types'

export const getExtensionCreative = (slug: string): Promise<IExtensionCreative> => {
	return Api.get<IResponseData<IExtensionCreativeResponse>>(
		'partner/campaigns/extension/ad/info', { slug }, {
			cache: {
				id: `partner-extension-creative-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
