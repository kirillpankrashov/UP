import type { IResponseData } from '@/core/types'
import type { ILinkAlerts } from '@/core/types/link'
import { LinkApi } from '@/core/client'

export const updateAlerts = (alerts: ILinkAlerts): Promise<ILinkAlerts> => {
	return LinkApi.patch<IResponseData<ILinkAlerts>>('platform/streamer/alerts', alerts).then(res => res.data)
}
