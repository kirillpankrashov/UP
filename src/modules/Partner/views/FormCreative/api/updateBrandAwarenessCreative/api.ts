import type { IResponseMessage } from '@/core/types/response'
import { Api } from '@/core/client'

import { dataToPayload } from './adapter'
import type {
	IUpdateBrandAwarenessCreativeData,
} from './types'

export const updateBrandAwarenessCreative = (data: IUpdateBrandAwarenessCreativeData) => {
	return Api.post<IResponseMessage>('partner/campaigns/brand_awareness/ad/update', dataToPayload(data), {
		cache: {
			update: {
				'brand-awareness-creative-info': { type: 'deletePrefix', value: 'partner-brand-awareness-creative-info' },
				'brand-awareness-campaign-structure': { type: 'deletePrefix', value: 'partner-brand-awareness-campaign-structure' },
			},
		},
	})
}
