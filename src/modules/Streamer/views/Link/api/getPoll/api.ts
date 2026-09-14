import type { IResponseData } from '@/core/types'
import type { ILinkPoll } from '@/core/types/link'
import { LinkApi } from '@/core/client'

export const getPoll = (): Promise<ILinkPoll> => {
	return LinkApi.get<IResponseData<ILinkPoll>>('platform/poll').then(res => res.data)
}
