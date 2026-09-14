import type { IResponseData } from '@/core/types'
import type { ILinkGoal } from '@/core/types/link'
import { LinkApi } from '@/core/client'

export const getGoal = (): Promise<ILinkGoal> => {
	return LinkApi.get<IResponseData<ILinkGoal>>('platform/goal').then(res => res.data)
}
