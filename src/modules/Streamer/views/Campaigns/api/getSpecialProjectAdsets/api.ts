import type { IResponse } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { ISpecialProjectAdsets, ISpecialProjectAdsetsResponse } from './types'

export const getSpecialProjectAdsets = (): Promise<ISpecialProjectAdsets> => {
	return Api.get<IResponse<ISpecialProjectAdsetsResponse>>('streamer/campaigns/special_project', undefined, {
		cache: {
			id: 'streamer-special-project-adsets',
			ttl: CacheTTL.ONE_HOUR,
		},
	})
		.then(res => responseToData(res))
}
