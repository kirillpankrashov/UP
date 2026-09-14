import type { IPaginatedData } from '@/core/types/response'

import type { IReferralHistoryItem } from '../types'

export const referralsHistory: IPaginatedData<IReferralHistoryItem[]> = {
	'status': true,
	'total': 1,
	'perPage': 1,
	data: [
		{
			'date': '2021-01-01',
			'amount': 100,
		},
	],
}