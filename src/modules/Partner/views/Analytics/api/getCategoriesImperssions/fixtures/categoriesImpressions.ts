import type { IPaginatedData } from '@/core/types/response'

import type { ICategoriesImperssions } from '../types'

export const categoriesImpressions: IPaginatedData<ICategoriesImperssions> = {
	status: true,
	perPage: 10,
	total: 10,
	data: {
		'dates': {
			'start': '2025-06-12 00:00:00',
			'end': '2025-06-22 23:59:59',
		},
		'title': 'India //APV/ 12th June to 22nd June 2025',
		'status': false,
		'updatedAt': '2025-07-07 12:58:12',
		'categories': [
			{
				'name': 'Gaming',
				'image': 'https://static-cdn.jtvnw.net/ttv-boxart/Gaming-136x190.jpg',
				'impressions': 6249984,
			},
			{
				'name': 'Entertainment',
				'image': 'https://static-cdn.jtvnw.net/ttv-boxart/Entertainment-136x190.jpg',
				'impressions': 23,
			},
		],
	},
}
