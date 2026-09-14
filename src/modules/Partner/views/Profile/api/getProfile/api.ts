import type { TPartner, TPartnerResponse } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'

export const getProfile = (): Promise<TPartner> => {
	return Api.get<TPartnerResponse>('partner/profile', {}, {
		cache: {
			id: 'partner-profile',
			ttl: CacheTTL.ONE_DAY,
		},
	}).then(
		(res) => responseToData(res),
	)
}
