import type { IResponseData } from '@/core/types'
import { Api } from '@/core/client'

export const getPrerollLink = (slug: string) => {
	return Api.get<IResponseData<{url: string}>>('streamer/campaigns/preroll/link', { slug })
}
