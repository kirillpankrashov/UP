import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

export const sendPreview = (slug: string, ads: string[]) => {
	return Api.post<IResponseMessage>(`ads/widget/debug/${slug}/real`, { ads })
}
