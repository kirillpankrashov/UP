import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'

import type { ICategoriesImperssionsResponse } from './types'
import type { ICategoriesImperssions } from './types'

export const responseToData = (response: IResponsePaginatedData<ICategoriesImperssionsResponse>): IPaginatedData<ICategoriesImperssions> => {
	return {
		status: response.status,
		perPage: response.per_page,
		total: response.total,
		data: {
			title: response.data.title,
			status: response.data.status,
			updatedAt: response.data.updatedAt,
			dates: {
				start: response.data.start,
				end: response.data.end,
			},
			categories: response.data.categories.map((category) => ({
				name: category.name,
				image: category.image,
				impressions: category.impressions,
			})),
		},
	}
}
