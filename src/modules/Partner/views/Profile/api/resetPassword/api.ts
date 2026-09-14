import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

import { dataToPayload } from './adapter'
import type { IChangePasswordData } from './types'

export const changePassword = (data: IChangePasswordData) => {
	return Api.post<IResponseMessage>('partner/profile/password', dataToPayload(data), {
		cache: {
			update: {
				'partner-profile': { type: 'deletePrefix', value: 'partner-profile' },
			},
		},
	})
}
