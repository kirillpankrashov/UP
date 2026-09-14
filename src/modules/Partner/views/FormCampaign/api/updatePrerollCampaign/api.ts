import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type {
	IPrerollCampaign,
	IPrerollCampaignResponse,
} from '@/modules/Partner/views/FormCampaign/api/getPrerollCampaign'
import { responseToData } from '@/modules/Partner/views/FormCampaign/api/getPrerollCampaign/adapter'

import { dataToPayload } from './adapter'
import type {
	IUpdatePrerollCampaignData,
} from './types'

export const updatePrerollCampaign = (data: IUpdatePrerollCampaignData): Promise<IPrerollCampaign> => {
	return Api.post<IResponse<{ campaign: IPrerollCampaignResponse }>>(
		'partner/campaigns/preroll/update', dataToPayload(data), {
			cache: {
				update: {
					'preroll-campaign-info': { type: 'deletePrefix', value: 'partner-preroll-campaign-info' },
					'preroll-campaign-structure': { type: 'deletePrefix', value: 'partner-preroll-campaign-structure' },
					'preroll-adset-info': { type: 'deletePrefix', value: 'partner-preroll-adset-info' },
				},
			},
		},
	)
		.then(res => responseToData(res.campaign))
}
