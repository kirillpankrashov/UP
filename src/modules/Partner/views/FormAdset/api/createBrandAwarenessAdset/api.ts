import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type {
	IBrandAwarenessAdset,
	IBrandAwarenessAdsetResponse,
} from '@/modules/Partner/views/FormAdset/api/getBrandAwarenessAdset'
import { responseToData } from '@/modules/Partner/views/FormAdset/api/getBrandAwarenessAdset/adapter'

import { dataToPayload } from './adapter'
import type {
	ICreateBrandAwarenessAdsetData,
} from './types'

export const createBrandAwarenessAdset = (data: ICreateBrandAwarenessAdsetData): Promise<IBrandAwarenessAdset> => {
	return Api.post<IResponse<{ ad_set: IBrandAwarenessAdsetResponse}>>(
		'partner/campaigns/brand_awareness/ad-set/create', dataToPayload(data), {
			cache: {
				update: {
					'brand-awareness-adsets': { type: 'deletePrefix', value: 'partner-brand-awareness-adsets' },
					'brand-awareness-campaign-structure': { type: 'deletePrefix', value: 'partner-brand-awareness-campaign-structure' },
				},
			},
		})
		.then(res => responseToData(res.ad_set))
}
