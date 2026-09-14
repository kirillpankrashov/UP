import type { IResponseMessage } from '@/core/types/response'
import { Api } from '@/core/client'

export const createSegment = (data: {
	title: string
	streamers: number[]
}) => {
	return Api.post<IResponseMessage>('partner/agency/segments/create', data, {
		cache: {
			update: {
				'segments': { type: 'deletePrefix', value: 'partner-segments' },
			},
		},
	})
}
