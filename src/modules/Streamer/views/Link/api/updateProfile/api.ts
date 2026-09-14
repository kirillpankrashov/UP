import { type IResponseData } from '@/core/types'
import type { ILinkProfile } from '@/core/types/link/profile'
import { LinkApi } from '@/core/client'

import { modelToPayload } from './adapter'

export const updateProfile = (profile: ILinkProfile): Promise<ILinkProfile> => {
	return LinkApi.patch<IResponseData<ILinkProfile>>('platform/streamer/profile', modelToPayload(profile)).then(res => res.data)
}
