import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type {
	IBrandAwarenessCampaign,
	IBrandAwarenessCampaignResponse,
} from '@/modules/Partner/views/FormCampaign/api/getBrandAwarenessCampaign'
import { responseToData } from '@/modules/Partner/views/FormCampaign/api/getBrandAwarenessCampaign/adapter'

import { dataToPayload } from './adapter'
import type {
	ICreateBrandAwarenessCampaignData,
} from './types'

export const createBrandAwarenessCampaign = (data: ICreateBrandAwarenessCampaignData): Promise<IBrandAwarenessCampaign> => {
	return Api.post<IResponse<{ campaign: IBrandAwarenessCampaignResponse}>>(
		'partner/campaigns/brand_awareness/create', dataToPayload(data), {
			cache: {
				update: {
					'brand-awareness-campaign-structure': { type: 'deletePrefix', value: 'partner-brand-awareness-campaign-structure' },
				},
			},
		})
		.then(res => responseToData(res.campaign))
}
