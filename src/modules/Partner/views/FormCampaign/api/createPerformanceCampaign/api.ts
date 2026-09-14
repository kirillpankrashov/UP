import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type {
	IPerformanceCampaign,
	IPerformanceCampaignResponse,
} from '@/modules/Partner/views/FormCampaign/api/getPerformanceCampaign'
import { responseToData } from '@/modules/Partner/views/FormCampaign/api/getPerformanceCampaign/adapter'

import { dataToPayload } from './adapter'
import type {
	ICreatePerformanceCampaignData,
} from './types'

export const createPerformanceCampaign = (data: ICreatePerformanceCampaignData): Promise<IPerformanceCampaign> => {
	return Api.post<IResponse<{ campaign: IPerformanceCampaignResponse }>>(
		'partner/campaigns/performance/create', dataToPayload(data), {
			cache: {
				update: {
					'performance-campaign-structure': { type: 'deletePrefix', value: 'partner-performance-campaign-structure' },
				},
			},
		})
		.then(res => responseToData(res.campaign))
}
