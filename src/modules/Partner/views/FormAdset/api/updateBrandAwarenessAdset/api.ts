import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type { IBrandAwarenessAdset, IBrandAwarenessAdsetResponse } from '@/modules/Partner/views/FormAdset/api/getBrandAwarenessAdset'
import { responseToData } from '@/modules/Partner/views/FormAdset/api/getBrandAwarenessAdset/adapter'

import { dataToPayload } from './adapter'
import type {
	IUpdateBrandAwarenessAdsetData,
} from './types'

export const updateBrandAwarenessAdset = (data: IUpdateBrandAwarenessAdsetData): Promise<IBrandAwarenessAdset> => {
	return Api.post<IResponse<{ ad_set: IBrandAwarenessAdsetResponse }>>(
		'partner/campaigns/brand_awareness/ad-set/update', dataToPayload(data), {
			cache: {
				update: {
					'brand-awareness-adsets': { type: 'deletePrefix', value: 'partner-brand-awareness-adsets' },
					'brand-awareness-campaign-structure': { type: 'deletePrefix', value: 'partner-brand-awareness-campaign-structure' },
					'brand-awareness-adset-info': { type: 'deletePrefix', value: 'partner-brand-awareness-adset-info' },
				},
			},
		})
		.then(res => responseToData(res.ad_set))
}
