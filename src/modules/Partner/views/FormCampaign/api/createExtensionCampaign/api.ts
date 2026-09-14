import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type {
	IExtensionCampaign,
	IExtensionCampaignResponse,
} from '@/modules/Partner/views/FormCampaign/api/getExtensionCampaign'
import { responseToData } from '@/modules/Partner/views/FormCampaign/api/getExtensionCampaign/adapter'

import { dataToPayload } from './adapter'
import type { ICreateExtensionCampaignData } from './types'

export const createExtensionCampaign = (data: ICreateExtensionCampaignData): Promise<IExtensionCampaign> => {
	return Api.post<IResponse<{ campaign: IExtensionCampaignResponse}>>(
		'partner/campaigns/extension/create', dataToPayload(data), {
			cache: {
				update: {
					'extension-campaign-structure': { type: 'deletePrefix', value: 'partner-extension-campaign-structure' },
				},
			},
		})
		.then(res => responseToData(res.campaign))
}
