import type { IPaginatedData } from '@/core/types/response'

import type { IHistoryReferral } from '../types'

export const historyData: IPaginatedData<IHistoryReferral[]> = {
	data: [
		{
			userId: 1534,
			name: 'PineappleSuitcase',
			signedUp: '2023-06-16 06:59:27',
			completed: false,
			impressions: {
				current: 0,
				total: 5000,
			},
		},
		{
			userId: 1530,
			name: 'smgrapheme',
			signedUp: '2023-04-04 07:11:27',
			completed: false,
			impressions: {
				current: 0,
				total: 5000,
			},
		},
	],
	perPage: 25,
	total: 2,
	status: true,
}
