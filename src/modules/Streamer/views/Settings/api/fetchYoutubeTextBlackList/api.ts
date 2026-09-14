import type { IResponseData } from '@/core/types'
import { YoutubeTextApi } from '@/core/client'

import { responseToData } from './adapter'

export const fetchYoutubeTextBlackList = (streamerId: number): Promise<string> => {
	return YoutubeTextApi.get<IResponseData<string>>(`streamer/${streamerId}/videos/blacklist`, {}, { showMessage: false }).then(
		(res) => responseToData(res.data),
	)
}
