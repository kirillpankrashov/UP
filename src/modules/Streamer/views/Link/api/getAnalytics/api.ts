import type { IResponseData } from '@/core/types'
import { Api } from '@/core/client'

import { responseToData } from './adapter'
import type { ILinkAnalytics, ILinkAnalyticsResponse } from './types'

export const getAnalytics = (): Promise<ILinkAnalytics> => {
	return Api.get<IResponseData<ILinkAnalyticsResponse>>('streamer/freemium/stats').then(
		res => responseToData(res.data),
	)
}
