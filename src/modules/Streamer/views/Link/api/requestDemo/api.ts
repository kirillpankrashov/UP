import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

export const requestDemo = async () => {
	return Api.get<IResponseMessage>('streamer/freemium/demo')
}
