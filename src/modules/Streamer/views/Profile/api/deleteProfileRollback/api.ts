import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

export const deleteProfileRollback = () => {
	return Api
		.post<IResponseMessage>('streamer/delete/rollback')
		.then(res => res)
}
