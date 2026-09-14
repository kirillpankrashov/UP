import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

export const reactivateStreamer = () => {
	return Api.post<IResponseMessage>('streamer/delete/rollback')
}
