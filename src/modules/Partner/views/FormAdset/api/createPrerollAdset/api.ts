import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type {
	IPrerollAdset,
	IPrerollAdsetResponse,
} from '@/modules/Partner/views/FormAdset/api/getPrerollAdset'
import { responseToData } from '@/modules/Partner/views/FormAdset/api/getPrerollAdset/adapter'

import { dataToPayload } from './adapter'
import type {
	ICreatePrerollAdsetData,
} from './types'

export const createPrerollAdset = (data: ICreatePrerollAdsetData): Promise<IPrerollAdset> => {
	return Api.post<IResponse<{ ad_set: IPrerollAdsetResponse}>>(
		'partner/campaigns/preroll/ad-set/create', dataToPayload(data), {
			cache: {
				update: {
					'preroll-campaign-structure': { type: 'deletePrefix', value: 'partner-preroll-campaign-structure' },
				},
			},
		})
		.then(res => responseToData(res.ad_set))
}
