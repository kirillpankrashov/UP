import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type {
	IPrerollAdset,
	IPrerollAdsetResponse,
} from '@/modules/Partner/views/FormAdset/api/getPrerollAdset'
import { responseToData } from '@/modules/Partner/views/FormAdset/api/getPrerollAdset/adapter'

import { dataToPayload } from './adapter'
import type {
	IUpdatePrerollAdsetData,
} from './types'

export const updatePrerollAdset = (data: IUpdatePrerollAdsetData): Promise<IPrerollAdset> => {
	return Api.post<IResponse<{ ad_set: IPrerollAdsetResponse}>>(
		'partner/campaigns/preroll/ad-set/update', dataToPayload(data), {
			cache: {
				update: {
					'preroll-adset-info': { type: 'deletePrefix', value: 'partner-preroll-adset-info' },
					'preroll-adsets': { type: 'deletePrefix', value: 'partner-preroll-adsets' },
					'preroll-campaign-structure': { type: 'deletePrefix', value: 'partner-preroll-campaign-structure' },
				},
			},
		},
	)
		.then(res => responseToData(res.ad_set))
}
