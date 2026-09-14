import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type { ISpecialProjectCampaign, ISpecialProjectCampaignResponse } from '@/modules/Partner/views/FormCampaign/api/getSpecialProjectCampaign'
import { responseToData } from '@/modules/Partner/views/FormCampaign/api/getSpecialProjectCampaign/adapter'

import { dataToPayload } from './adapter'
import type {
	IUpdateSpecialProjectCampaignData,
} from './types'

export const updateSpecialProjectCampaign = (data: IUpdateSpecialProjectCampaignData): Promise<ISpecialProjectCampaign> => {
	return Api.post<IResponse<{ campaign: ISpecialProjectCampaignResponse }>>(
		'partner/campaigns/special_project/update', dataToPayload(data), {
			cache: {
				update: {
					'special-project-campaign-info': { type: 'deletePrefix', value: 'partner-special-project-campaign-info' },
					'special-project-campaign-structure': { type: 'deletePrefix', value: 'partner-special-project-campaign-structure' },
					'special-project-adset-info': { type: 'deletePrefix', value: 'partner-special-project-adset-info' },
					'special-project-creative-info': { type: 'deletePrefix', value: 'partner-special-project-creative-info' },
				},
			},
		},
	)
		.then(res => responseToData(res.campaign))
}
