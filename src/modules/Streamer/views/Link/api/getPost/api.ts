import type { IResponseData } from '@/core/types'
import type { ILinkPost } from '@/core/types/link'
import { LinkApi } from '@/core/client'

export const getPost = (id: number): Promise<ILinkPost> => {
	return LinkApi.get<IResponseData<ILinkPost>>(`platform/posts/${id}`).then(res => res.data)
}
