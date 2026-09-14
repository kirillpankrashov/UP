import type { IResponseData } from '@/core/types'
import { Api } from '@/core/client'

import { responseToData } from './adapter'
import type { IWalletAnalyticsDay, IWalletAnalyticsDayResponse } from './types'

export const getAnalytics = (
	streamerId: number,
	start: string,
	end: string,
): Promise<IWalletAnalyticsDay[]> => {
	return Api.get<IResponseData<IWalletAnalyticsDayResponse[]>>(
		`statistic/streamer/${streamerId}/income/${start}/${end}`,
	).then((res) => responseToData(res.data))
}
