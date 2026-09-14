import type { IResponseData } from '@/core/types'
import type { ILinkGoal } from '@/core/types/link'
import { LinkApi } from '@/core/client'
import type { GoalFormModel } from '@/modules/Streamer/views/Link/store'

import { modelToPayload } from './adapter'

export const createGoal = (goal: GoalFormModel): Promise<ILinkGoal> => {
	return LinkApi.post<IResponseData<ILinkGoal>>('platform/goal', modelToPayload(goal)).then((res) => res.data)
}
