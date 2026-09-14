import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'

import type { IStreamer, IStreamerResponse } from './types'

export const responseToData = (response: IResponsePaginatedData<IStreamerResponse[]>): IPaginatedData<IStreamer[]> => ({
	status: response.status,
	total: response.total,
	perPage: response.per_page,
	data: response.data.map(streamer => ({
		id: streamer.id,
		name: streamer.name,
		lastActivity: streamer.last_activity_at,
		wallet: {
			balance: streamer.wallet.balance,
			currency: streamer.wallet.currency,
		},
		campaigns: streamer.campaigns,
		checkListStatus: streamer.check_list_status,
		payableStatus: streamer.payable_status,
		ctrStatus: streamer.ctr_status,
	})),
})
