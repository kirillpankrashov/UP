import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type {
	IExtensionAdset,
	IExtensionAdsetResponse,
} from '@/modules/Partner/views/FormAdset/api/getExtensionAdset'
import { responseToData } from '@/modules/Partner/views/FormAdset/api/getExtensionAdset/adapter'

import { dataToPayload } from './adapter'
import type {
	ICreateExtensionAdsetData,
} from './types'

export const createExtensionAdset = (data: ICreateExtensionAdsetData): Promise<IExtensionAdset> => {
	return Api.post<IResponse<{ ad_set: IExtensionAdsetResponse}>>(
		'partner/campaigns/extension/ad-set/create', dataToPayload(data), {
			cache: {
				update: {
					'extension-campaign-structure': { type: 'deletePrefix', value: 'partner-extension-campaign-structure' },
				},
			},
		})
		.then(res => responseToData(res.ad_set))
}
