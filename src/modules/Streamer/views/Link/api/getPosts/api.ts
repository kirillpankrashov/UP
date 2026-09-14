import type { IResponseData } from '@/core/types'
import { LinkApi } from '@/core/client'

import type { ILinkPosts } from './types'

export const getPosts = (limit: number, offset: number): Promise<ILinkPosts> => {
	return LinkApi.get<IResponseData<ILinkPosts>>('platform/posts', { limit, offset }).then(res => res.data)
}
