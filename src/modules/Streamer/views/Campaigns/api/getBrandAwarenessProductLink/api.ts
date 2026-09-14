import type { IResponseData } from '@/core/types'
import { Api } from '@/core/client'

export const getBrandAwarenessProductLink = (slug: string) => {
	return Api.get<IResponseData<{url: string}>>('streamer/brand_awareness/product/link', { slug })
}
