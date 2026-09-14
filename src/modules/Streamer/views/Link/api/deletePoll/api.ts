import type { IResponseMessage } from '@/core/types'
import { LinkApi } from '@/core/client'

export const deletePoll = () => {
	return LinkApi.delete<IResponseMessage>('platform/poll')
}
