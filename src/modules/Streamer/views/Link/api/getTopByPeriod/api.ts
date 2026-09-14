import type { IResponseData } from '@/core/types'
import type { ILinkTopSupporter } from '@/core/types/link'
import { LinkApi } from '@/core/client'

export const getTopByPeriod = (startDate: string, endDate: string): Promise<ILinkTopSupporter[]> => {
	return LinkApi.get<IResponseData<ILinkTopSupporter[]>>('platform/streamer/tops/period', { startDate, endDate }).then(res => res.data)
}
