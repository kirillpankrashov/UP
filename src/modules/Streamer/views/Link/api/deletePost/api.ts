import type { IResponseData } from '@/core/types'
import type { ILinkPost } from '@/core/types/link'
import { LinkApi } from '@/core/client'

export const deletePost = (id: number) => {
	return LinkApi.delete<IResponseData<ILinkPost>>(`platform/posts/${id}`)
}
