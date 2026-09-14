import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'

import type { IReferralHistoryItem } from './types'

export const responseToData = (response: IResponsePaginatedData<IReferralHistoryItem[]> & { amount: number }): IPaginatedData<IReferralHistoryItem[]> & { amount: number } => {
	return {
		data: response.data,
		total: response.total,
		perPage: response.per_page,
		status: response.status,
		amount: response.amount,
	}
}