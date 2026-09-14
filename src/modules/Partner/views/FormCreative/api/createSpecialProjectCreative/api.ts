import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'

import type {
	ISpecialProjectCreative,
	ISpecialProjectCreativeResponse,
} from '../getSpecialProjectCreative'
import { responseToData } from '../getSpecialProjectCreative/adapter'

import { dataToPayload } from './adapter'
import type {
	ICreateSpecialProjectCreativeData,
} from './types'

export const createSpecialProjectCreative = (data: ICreateSpecialProjectCreativeData): Promise<ISpecialProjectCreative> => {
	return Api.post<IResponse<{ ad: ISpecialProjectCreativeResponse }>>('partner/campaigns/special_project/ad/create', dataToPayload(data), {
		cache: {
			update: {
				'special-project-campaign-structure': { type: 'deletePrefix', value: 'partner-special-project-campaign-structure' },
			},
		},
	})
		.then(res => responseToData(res.ad))
}
