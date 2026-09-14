import type { IResponse } from '@/core/types/response'
import { Api } from '@/core/client'
import type { ISpecialProjectAdset, ISpecialProjectAdsetResponse } from '@/modules/Partner/views/FormAdset/api/getSpecialProjectAdset'
import { responseToData } from '@/modules/Partner/views/FormAdset/api/getSpecialProjectAdset/adapter'

import { dataToPayload } from './adapter'
import type {
	IUpdateSpecialProjectAdsetData,
} from './types'

export const updateSpecialProjectAdset = (data: IUpdateSpecialProjectAdsetData): Promise<ISpecialProjectAdset> => {
	return Api.post<IResponse<{ ad_set: ISpecialProjectAdsetResponse }>>(
		'partner/campaigns/special_project/ad-set/update', dataToPayload(data), {
			cache: {
				update: {
					'special-project-adsets': { type: 'deletePrefix', value: 'partner-special-project-adsets' },
					'special-project-campaign-structure': { type: 'deletePrefix', value: 'partner-special-project-campaign-structure' },
					'special-project-adset-info': { type: 'deletePrefix', value: 'partner-special-project-adset-info' },
				},
			},
		})
		.then(res => responseToData(res.ad_set))
}
