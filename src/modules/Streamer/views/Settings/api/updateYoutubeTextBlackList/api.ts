import type { IStatus } from '@/core/types'
import { YoutubeTextApi } from '@/core/client'


export const updateYoutubeTextBlackList = (streamerId: number, videos: string) => {
	return YoutubeTextApi.post<IStatus>(`streamer/${streamerId}/videos/blacklist`, { videos })
}
