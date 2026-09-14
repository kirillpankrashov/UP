import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

import type { IUpdateProfileData } from './types'

export const updateProfile = (data: IUpdateProfileData) => {
	return Api.post<IResponseMessage>('partner/profile', data, {
		cache: {
			update: {
				'partner-profile': { type: 'deletePrefix', value: 'partner-profile' },
			},
		},
	})
}
