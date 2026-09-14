import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type { IExtensionCampaign, IExtensionCampaignResponse } from '@/modules/Partner/views/FormCampaign/api/getExtensionCampaign'
import { responseToData } from '@/modules/Partner/views/FormCampaign/api/getExtensionCampaign/adapter'

import { dataToPayload } from './adapter'
import type {
	IUpdateExtensionCampaignData,
} from './types'

export const updateExtensionCampaign = (data: IUpdateExtensionCampaignData): Promise<IExtensionCampaign> => {
	return Api.post<IResponse<{ campaign: IExtensionCampaignResponse }>>(
		'partner/campaigns/extension/update', dataToPayload(data), {
			cache: {
				update: {
					'extension-campaign-info': { type: 'deletePrefix', value: 'partner-extension-campaign-info' },
					'extension-campaign-structure': { type: 'deletePrefix', value: 'partner-extension-campaign-structure' },
					'extension-adset-info': { type: 'deletePrefix', value: 'partner-extension-adset-info' },
					'extension-creative-info': { type: 'deletePrefix', value: 'partner-extension-creative-info' },
				},
			},
		},
	)
		.then(res => responseToData(res.campaign))
}
