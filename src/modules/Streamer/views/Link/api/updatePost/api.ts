import type { IResponseData } from '@/core/types'
import type { ILinkPost } from '@/core/types/link'
import { LinkApi } from '@/core/client'

import { modelToPayload } from './adapter'

export const updatePost = (post: ILinkPost): Promise<ILinkPost> => {
	return LinkApi.patch<IResponseData<ILinkPost>>(`platform/posts/${post.id}`, modelToPayload(post)).then(res => res.data)
}
