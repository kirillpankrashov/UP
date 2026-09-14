import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type { IExtensionAdset, IExtensionAdsetResponse } from '@/modules/Partner/views/FormAdset/api/getExtensionAdset'
import { responseToData } from '@/modules/Partner/views/FormAdset/api/getExtensionAdset/adapter'

import { dataToPayload } from './adapter'
import type {
	IUpdateExtensionAdsetData,
} from './types'

export const updateExtensionAdset = (data: IUpdateExtensionAdsetData): Promise<IExtensionAdset> => {
	return Api.post<IResponse<{ ad_set: IExtensionAdsetResponse }>>(
		'partner/campaigns/extension/ad-set/update', dataToPayload(data), {
			cache: {
				update: {
					'extension-adset-info': { type: 'deletePrefix', value: 'partner-extension-adset-info' },
					'extension-adsets': { type: 'deletePrefix', value: 'partner-extension-adsets' },
					'extension-campaign-structure': { type: 'deletePrefix', value: 'partner-extension-campaign-structure' },
				},
			},
		})
		.then(res => responseToData(res.ad_set))
}
