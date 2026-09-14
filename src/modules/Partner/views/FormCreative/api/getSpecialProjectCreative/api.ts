import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	ISpecialProjectCreative,
	ISpecialProjectCreativeResponse,
} from './types'

export const getSpecialProjectCreative = (slug: string): Promise<ISpecialProjectCreative> => {
	return Api.get<IResponseData<ISpecialProjectCreativeResponse>>(
		'partner/campaigns/special_project/ad/info', { slug }, {
			cache: {
				id: `partner-special-project-creative-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		},
	)
		.then(res => responseToData(res.data))
}
