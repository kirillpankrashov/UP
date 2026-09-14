import type { IResponseData } from '@/core/types'
import { Api } from '@/core/client'

import { responseToData } from './adapter'
import type { TTier, TTierResponse } from './types'

export const getTier = (): Promise<TTier> => {
	return Api.get<IResponseData<TTierResponse>>('streamer/tier').then(
		(res) => responseToData(res.data),
	)
}
