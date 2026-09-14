import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

export const resendEmail = () => {
	return Api.get<IResponseMessage>('streamer/profile/email/resend')
		.then(res => res)
}
