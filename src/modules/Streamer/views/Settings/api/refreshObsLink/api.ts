import { type IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

export const refreshObsLink = () => {
	return Api.post<IResponseMessage>('streamer/widget/obs/refresh').then(
		(res) => res,
	)
}
