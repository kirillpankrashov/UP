import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type {
	ISpecialProjectCampaign,
	ISpecialProjectCampaignResponse,
} from '@/modules/Partner/views/FormCampaign/api/getSpecialProjectCampaign'
import { responseToData } from '@/modules/Partner/views/FormCampaign/api/getSpecialProjectCampaign/adapter'

import { dataToPayload } from './adapter'
import type {
	ICreateSpecialProjectCampaignData,
} from './types'

export const createSpecialProjectCampaign = (data: ICreateSpecialProjectCampaignData): Promise<ISpecialProjectCampaign> => {
	return Api.post<IResponse<{ campaign: ISpecialProjectCampaignResponse}>>(
		'partner/campaigns/special_project/create', dataToPayload(data), {
			cache: {
				update: {
					'special-project-campaign-structure': { type: 'deletePrefix', value: 'partner-special-project-campaign-structure' },
				},
			},
		})
		.then(res => responseToData(res.campaign))
}
