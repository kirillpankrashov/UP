import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type { IBrandAwarenessCampaign, IBrandAwarenessCampaignResponse } from '@/modules/Partner/views/FormCampaign/api/getBrandAwarenessCampaign'
import { responseToData } from '@/modules/Partner/views/FormCampaign/api/getBrandAwarenessCampaign/adapter'

import { dataToPayload } from './adapter'
import type {
	IUpdateBrandAwarenessCampaignData,
} from './types'

export const updateBrandAwarenessCampaign = (data: IUpdateBrandAwarenessCampaignData): Promise<IBrandAwarenessCampaign> => {
	return Api.post<IResponse<{ campaign: IBrandAwarenessCampaignResponse }>>(
		'partner/campaigns/brand_awareness/update', dataToPayload(data), {
			cache: {
				update: {
					'brand-awareness-campaign-info': { type: 'deletePrefix', value: 'partner-brand-awareness-campaign-info' },
					'brand-awareness-campaign-structure': { type: 'deletePrefix', value: 'partner-brand-awareness-campaign-structure' },
					'brand-awareness-adset-info': { type: 'deletePrefix', value: 'partner-brand-awareness-adset-info' },
					'brand-awareness-creative-info': { type: 'deletePrefix', value: 'partner-brand-awareness-creative-info' },
				},
			},
		},
	)
		.then(res => responseToData(res.campaign))
}
