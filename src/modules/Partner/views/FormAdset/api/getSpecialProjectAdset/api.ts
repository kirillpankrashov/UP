import type { IResponseData } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	ISpecialProjectAdset,
	ISpecialProjectAdsetResponse,
} from './types'

export const getSpecialProjectAdset = (slug: string): Promise<ISpecialProjectAdset> => {
	return Api.get<IResponseData<ISpecialProjectAdsetResponse>>(
		'partner/campaigns/special_project/ad-set/info', { slug }, {
			cache: {
				id: `partner-special-project-adset-info-${slug}`,
				ttl: CacheTTL.ONE_HOUR,
			},
		})
		.then(res => responseToData(res.data))
}
