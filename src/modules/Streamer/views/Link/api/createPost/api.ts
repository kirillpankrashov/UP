import type { ILinkPost } from '@/core/types/link'
import { LinkApi } from '@/core/client'
import type { ILinkPostModel } from '@/modules/Streamer/views/Link/store'

export const createPost = (post: ILinkPostModel) => {
	return LinkApi.post<ILinkPost>('platform/posts', post)
}
