

import type { IStatus } from '@/core/types'
import { Api } from '@/core/client'

import { dataToPayload } from './adapter'
import type { IUpdateStreamerInfoData } from './types'

export const updateStreamerInfo = (streamerId: number, data: IUpdateStreamerInfoData) => {
	return Api
		.post<IStatus>(`partner/agency/streamer/${streamerId}/save`, dataToPayload(data), {
			cache: {
				update: {
					'agency-streamer-info': { type: 'deletePrefix', value: 'agency-streamer-info' },
				},
			},
		})
		.then(res => res)
}
