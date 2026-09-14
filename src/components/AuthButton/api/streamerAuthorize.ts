import { type IResponse } from '@/core/types/response'
import { Api } from '@/core/client'

export const streamerAuthorize = (requestUrl: string) => {
	return Api
		.get<IResponse<{src: Location}>>(requestUrl)
		.then(res => res.src)
}
