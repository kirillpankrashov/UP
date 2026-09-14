import type { IStatus } from '@/core/types/response'
import { Api } from '@/core/client'

export const detachReferral = (referralId: number) => {
	return Api.post<IStatus>('partner/referral/detach', { referral: referralId })
}
