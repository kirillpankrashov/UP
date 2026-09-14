import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type {
	IPrerollCampaign,
	IPrerollCampaignResponse,
} from '@/modules/Partner/views/FormCampaign/api/getPrerollCampaign'
import { responseToData } from '@/modules/Partner/views/FormCampaign/api/getPrerollCampaign/adapter'

import { dataToPayload } from './adapter'
import type {
	ICreatePrerollCampaignData,
} from './types'

export const createPrerollCampaign = (data: ICreatePrerollCampaignData): Promise<IPrerollCampaign> => {
	return Api.post<IResponse<{ campaign: IPrerollCampaignResponse }>>(
		'partner/campaigns/preroll/create', dataToPayload(data), {
			cache: {
				update: {
					'preroll-campaign-structure': { type: 'deletePrefix', value: 'partner-preroll-campaign-structure' },
				},
			},
		})
		.then(res => responseToData(res.campaign))
}
