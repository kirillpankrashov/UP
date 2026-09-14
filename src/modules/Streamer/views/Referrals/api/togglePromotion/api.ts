import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

export const togglePromotion = (status: boolean) => {
	return Api.post<IResponseMessage>('streamer/referral/save', { promotion: status })
}
