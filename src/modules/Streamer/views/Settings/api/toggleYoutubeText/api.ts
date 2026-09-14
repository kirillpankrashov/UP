import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

export const toggleYoutubeText = (status: boolean) => {
	return Api.post<IResponseMessage>('streamer/program/yt/status', { enable: status })
}
