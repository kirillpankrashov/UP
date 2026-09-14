import { type IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

export const sendManual = () => {
	return Api.get<IResponseMessage>('ads/widget/manual').then(
		(res) => res,
	)
}
