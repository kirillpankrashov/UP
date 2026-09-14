import type { IStatus } from '@/core/types'
import { Api } from '@/core/client'

import { dataToPayload } from './adapter'
import type { IUpdateAgencyData } from './types'

export const updateAgency = (data: IUpdateAgencyData) => {
	return Api.post<IStatus>('partner/agency/save', dataToPayload(data), {
		cache: {
			update: {
				'agency-data': { type: 'deletePrefix', value: 'agency-data' },
				'agency-streamer-info': { type: 'deletePrefix', value: 'agency-streamer-info' },
			},
		},
	})
		.then(res => res)
}
