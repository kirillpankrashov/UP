import type { IResponseMessage } from '@/core/types/response'
import { Api } from '@/core/client'

import { dataToPayload } from './adapter'
import type {
	IUpdateSpecialProjectCreativeData,
} from './types'

export const updateSpecialProjectCreative = (data: IUpdateSpecialProjectCreativeData) => {
	return Api.post<IResponseMessage>('partner/campaigns/special_project/ad/update', dataToPayload(data), {
		cache: {
			update: {
				'special-project-creative-info': { type: 'deletePrefix', value: 'partner-special-project-creative-info' },
				'special-project-campaign-structure': { type: 'deletePrefix', value: 'partner-special-project-campaign-structure' },
			},
		},
	})
}
