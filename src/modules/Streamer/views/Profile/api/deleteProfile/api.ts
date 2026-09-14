import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

export const deleteProfile = () => {
	return Api
		.post<IResponseMessage>('streamer/delete')
		.then(res => res)
}
