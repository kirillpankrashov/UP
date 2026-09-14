import type { IPrerollVod,IResponseData } from '@/core/types'
import { Api } from '@/core/client'

export const updatePrerollVideo = (videoId: number, vodVideo: {slug: string; video: string}) => {
	return Api.post<IResponseData<IPrerollVod>>(`streamer/campaigns/preroll/videos/${videoId}/update`, vodVideo, {
		cache: {
			update: {
				'streamer-preroll-adset-info': { type: 'deletePrefix', value: 'streamer-preroll-adset-info' },
			},
		},
	})
}
