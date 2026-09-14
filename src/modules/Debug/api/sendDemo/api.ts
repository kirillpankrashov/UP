import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

export const sendDemo = (slug: string) => {
	return Api.get<IResponseMessage>(`ads/widget/debug/${slug}/demo`)
}
