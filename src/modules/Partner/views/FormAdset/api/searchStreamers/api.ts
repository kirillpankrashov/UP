import { Platform } from '@/core/types'
import type { IResponseData } from '@/core/types/response'
import { Api } from '@/core/client'

import { dataToPayload, responseToData } from './adapter'
import type {
	ITargetingStreamerSearch,
	ITargetingStreamerSearchData,
	ITargetingStreamerSearchResponse,
} from './types'

export const searchStreamers = (platform: Platform, data: ITargetingStreamerSearchData, specialProject = false): Promise<ITargetingStreamerSearch[]> => {
	const url = specialProject ? `partner/campaigns/special_project/streamer/search/${platform}` : `streamer/search/${platform}`

	return Api.get<IResponseData<ITargetingStreamerSearchResponse[]>>(url, dataToPayload(data))
		.then(res => responseToData(platform, res.data))
}
