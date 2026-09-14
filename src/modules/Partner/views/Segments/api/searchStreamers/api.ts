import type { IResponseData } from '@/core/types/response'
import { Api } from '@/core/client'

import type { ISearchStreamer } from './types'

export const searchStreamers = (title: string, segmentId?: number): Promise<ISearchStreamer[]> => {
	return Api.get<IResponseData<ISearchStreamer[]>>(
		'partner/agency/segments/streamer/search', { q: title, tag_id: segmentId })
		.then(res => res.data)
}
