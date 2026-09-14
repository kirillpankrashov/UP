import type { IResponseData } from '@/core/types'
import type { ILinkAlerts } from '@/core/types/link'
import { LinkApi } from '@/core/client'

export const getAlerts = (): Promise<ILinkAlerts> => {
	return LinkApi.get<IResponseData<ILinkAlerts>>('platform/streamer/alerts').then(res => res.data)
}
