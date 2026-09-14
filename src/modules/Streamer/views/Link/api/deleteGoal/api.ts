import type { IResponseMessage } from '@/core/types'
import { LinkApi } from '@/core/client'

export const deleteGoal = () => {
	return LinkApi.delete<IResponseMessage>('platform/goal')
}
