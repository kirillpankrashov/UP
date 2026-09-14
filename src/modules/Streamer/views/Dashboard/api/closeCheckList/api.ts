import type { IStatus } from '@/core/types'
import { Api } from '@/core/client'

export const closeCheckList = () => {
	return Api.post<IStatus>('streamer/dashboard/check-list/close').then(
		(res) => res,
	)
}
