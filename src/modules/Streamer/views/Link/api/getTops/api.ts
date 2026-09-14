import type { IResponseData } from '@/core/types'
import { LinkApi } from '@/core/client'

import type { ILinkTops } from './types'

export const getTops = (): Promise<ILinkTops> => {
	return LinkApi.get<IResponseData<ILinkTops>>('platform/streamer/tops').then(res => res.data)
}
