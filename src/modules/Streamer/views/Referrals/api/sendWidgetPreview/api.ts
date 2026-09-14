import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

export const sendWidgetPreview = () => {
	return Api.get<IResponseMessage>('ads/widget/referral/demo')
}
