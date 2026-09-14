import { CampaignType } from '@/core/types'
import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'

import type { IBrandAwarenessCompletedAdset, IBrandAwarenessCompletedAdsetResponse } from './types'

export const responseToData = (response: IResponsePaginatedData<IBrandAwarenessCompletedAdsetResponse[]>): IPaginatedData<IBrandAwarenessCompletedAdset[]> => {
	return {
		status: response.status,
		perPage: response.per_page,
		total: response.total,
		data: response.data.map(adset => ({
			campaignType: CampaignType.BRAND_AWARENESS,
			id: adset.id,
			slug: adset.slug,
			title: adset.title,
			description: adset.description,
			logo: adset.logo,
			dates: {
				start: adset.start,
				end: adset.end,
			},
			status: adset.status,
		})),
	}
}
