import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type {
	IPerformanceAdset,
	IPerformanceAdsetResponse,
} from '@/modules/Partner/views/FormAdset/api/getPerformanceAdset'
import { responseToData } from '@/modules/Partner/views/FormAdset/api/getPerformanceAdset/adapter'

import { dataToPayload } from './adapter'
import type {
	IUpdatePerformanceAdsetData,
} from './types'

export const updatePerformanceAdset = (data: IUpdatePerformanceAdsetData): Promise<IPerformanceAdset> => {
	return Api.post<IResponse<{ ad_set: IPerformanceAdsetResponse}>>(
		'partner/campaigns/performance/ad-set/update', dataToPayload(data), {
			cache: {
				update: {
					'performance-adset-info': { type: 'deletePrefix', value: 'partner-performance-adset-info' },
					'performance-adsets': { type: 'deletePrefix', value: 'partner-performance-adsets' },
					'performance-campaign-structure': { type: 'deletePrefix', value: 'partner-performance-campaign-structure' },
				},
			},
		},
	)
		.then(res => responseToData(res.ad_set))
}
