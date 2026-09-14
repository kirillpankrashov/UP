import type { IResponseMessage } from '@/core/types/response'
import { Api } from '@/core/client'

import { dataToPayload } from './adapter'
import type {
	IUpdateExtensionCreativeData,
} from './types'

export const updateExtensionCreative = (data: IUpdateExtensionCreativeData) => {
	return Api.post<IResponseMessage>('partner/campaigns/extension/ad/update', dataToPayload(data), {
		cache: {
			update: {
				'extension-creative-info': { type: 'deletePrefix', value: 'partner-extension-creative-info' },
				'extension-campaign-structure': { type: 'deletePrefix', value: 'partner-extension-campaign-structure' },
			},
		},
	})
}
