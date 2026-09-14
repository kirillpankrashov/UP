import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'

import type { IHistoryReferral, IHistoryReferralResponse } from './types'

export const responseToData = (response: IResponsePaginatedData<IHistoryReferralResponse[]>): IPaginatedData<IHistoryReferral[]> => {
	return {
		status: response.status,
		data: response.data.map(referral => ({
			completed: referral.completed,
			name: referral.name,
			signedUp: referral.signed_up,
			userId: referral.user_id,
			impressions: {
				current: referral.impressions,
				total: referral.total_impressions,
			},
		})),
		perPage: response.per_page,
		total: response.total,
	}
}
