import type { IResponseData } from '@/core/types'
import type { ILinkProfile } from '@/core/types/link/profile'
import { LinkApi } from '@/core/client'

import { responseToData } from './adapter'
import type { ILinkProfileResponse } from './types'

export const getProfile = (): Promise<ILinkProfile> => {
	return LinkApi.get<IResponseData<ILinkProfileResponse>>('platform/streamer/profile').then(
		(res) => responseToData(res.data),
	)
}
