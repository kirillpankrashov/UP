import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type {
	IPerformanceAdset,
	IPerformanceAdsetResponse,
} from '@/modules/Partner/views/FormAdset/api/getPerformanceAdset'
import { responseToData } from '@/modules/Partner/views/FormAdset/api/getPerformanceAdset/adapter'

import { dataToPayload } from './adapter'
import type {
	ICreatePerformanceAdsetData,
} from './types'

export const createPerformanceAdset = (data: ICreatePerformanceAdsetData): Promise<IPerformanceAdset> => {
	return Api.post<IResponse<{ ad_set: IPerformanceAdsetResponse}>>(
		'partner/campaigns/performance/ad-set/create', dataToPayload(data), {
			cache: {
				update: {
					'performance-campaign-structure': { type: 'deletePrefix', value: 'partner-performance-campaign-structure' },
				},
			},
		})
		.then(res => responseToData(res.ad_set))
}
