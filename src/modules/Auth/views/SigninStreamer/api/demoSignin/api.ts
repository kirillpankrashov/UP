import type { IResponse } from '@/core/types'
import { Api } from '@/core/client'

import { responseToData } from './adapter'
import type { TStreamerDemoData, TStreamerDemoResponse } from './types'

export const demoSignin = (): Promise<TStreamerDemoData> => {
	return Api
		.get<IResponse<TStreamerDemoResponse>>('auth/streamer/demo')
		.then(res => responseToData(res))
}
