import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'

import type {
	IBrandAwarenessCreative,
	IBrandAwarenessCreativeResponse,
} from '../getBrandAwarenessCreative'
import { responseToData } from '../getBrandAwarenessCreative/adapter'

import { dataToPayload } from './adapter'
import type {
	ICreateBrandAwarenessCreativeData,
} from './types'

export const createBrandAwarenessCreative = (data: ICreateBrandAwarenessCreativeData): Promise<IBrandAwarenessCreative> => {
	return Api.post<IResponse<{ ad: IBrandAwarenessCreativeResponse }>>('partner/campaigns/brand_awareness/ad/create', dataToPayload(data), {
		cache: {
			update: {
				'brand-awareness-campaign-structure': { type: 'deletePrefix', value: 'partner-brand-awareness-campaign-structure' },
			},
		},
	})
		.then(res => responseToData(res.ad))
}
