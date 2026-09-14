import type { TStreamer, TStreamerResponse } from '@/core/types'
import { Api } from '@/core/client'

import { responseToData } from './adapter'

export const getProfile = (): Promise<TStreamer> => {
	return Api.get<TStreamerResponse>('streamer/profile').then(
		(res) => responseToData(res),
	)
}
