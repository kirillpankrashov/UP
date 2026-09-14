import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'

import type {
	IExtensionCreative,
	IExtensionCreativeResponse,
} from '../getExtensionCreative'
import { responseToData } from '../getExtensionCreative/adapter'

import { dataToPayload } from './adapter'
import type { ICreateExtensionCreativeData } from './types'

export const createExtensionCreative = (data: ICreateExtensionCreativeData): Promise<IExtensionCreative> => {
	return Api.post<IResponse<{ ad: IExtensionCreativeResponse }>>('partner/campaigns/extension/ad/create', dataToPayload(data), {
		cache: {
			update: {
				'extension-campaign-structure': { type: 'deletePrefix', value: 'partner-extension-campaign-structure' },
			},
		},
	})
		.then(res => responseToData(res.ad))
}
