import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type {
	IPerformanceCampaign,
	IPerformanceCampaignResponse,
} from '@/modules/Partner/views/FormCampaign/api/getPerformanceCampaign'
import { responseToData } from '@/modules/Partner/views/FormCampaign/api/getPerformanceCampaign/adapter'

import { dataToPayload } from './adapter'
import type {
	IUpdatePerformanceCampaignData,
} from './types'

export const updatePerformanceCampaign = (data: IUpdatePerformanceCampaignData): Promise<IPerformanceCampaign> => {
	return Api.post<IResponse<{ campaign: IPerformanceCampaignResponse }>>(
		'partner/campaigns/performance/update', dataToPayload(data), {
			cache: {
				update: {
					'performance-campaign-info': { type: 'deletePrefix', value: 'partner-performance-campaign-info' },
					'performance-campaign-structure': { type: 'deletePrefix', value: 'partner-performance-campaign-structure' },
					'performance-adset-info': { type: 'deletePrefix', value: 'partner-performance-adset-info' },
				},
			},
		},
	)
		.then(res => responseToData(res.campaign))
}
