import type { IResponseData } from '@/core/types'
import { LinkApi } from '@/core/client'

import type { ILinkStatistics } from './types'

export const getStatistics = (): Promise<ILinkStatistics> => {
	return LinkApi.get<IResponseData<ILinkStatistics>>('platform/streamer/statistics').then(res => res.data)
}
