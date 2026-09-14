import type { IResponseData } from '@/core/types'
import { Api } from '@/core/client'

import type { IDebugAdset } from './types'

export const getCampaignsList = (slug: string): Promise<IDebugAdset[]> => {
	return Api.get<IResponseData<IDebugAdset[]>>(`ads/widget/debug/${slug}/list`).then(
		(res) => res.data,
	)
}
