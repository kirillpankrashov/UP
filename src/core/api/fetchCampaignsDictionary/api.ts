import type { CampaignType, Locale } from '@/core/types'
import type { IResponse } from '@/core/types/response'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type {
	ICampaignsDictionary,
	ICampaignsDictionaryResponse,
} from './types'

export const getCampaignsDictionary = (locale: Locale, campaignType: CampaignType): Promise<ICampaignsDictionary> => {
	return Api.get<IResponse<ICampaignsDictionaryResponse>>(
		`partner/campaigns/${campaignType}/dictionaries`,
		{ locale },
		{
			cache: {
				id: `dict-campaigns-${campaignType}`,
				ttl: CacheTTL.ONE_DAY,
			},
		},
	).then(res => responseToData(res))
}
