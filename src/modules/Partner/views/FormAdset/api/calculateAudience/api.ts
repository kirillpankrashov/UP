import type { CampaignType } from '@/core/types'
import type { IResponseData } from '@/core/types/response'
import { Api } from '@/core/client'
import type { ICreateAdsetModel } from '@/modules/Partner/views/FormAdset/types'

import { dataToPayload } from './adapter'
import type { IAudience } from './types'

export const calculateAudience = (campaignType: CampaignType, model: ICreateAdsetModel): Promise<IAudience> => {
	return Api.post<IResponseData<IAudience>>(
		`partner/campaigns/${campaignType}/ad-set/audience`, dataToPayload(campaignType, model))
		.then(res => res.data)
}
