import type { IResponseData } from '@/core/types/response'

import type { IReferralStreamer } from '../types'

export const referralStreamers: IResponseData<IReferralStreamer[]> & { amount: number } = {
	'status': true,
	amount: 100,
	data: [
		{
			streamer: {
				id: 1,
				twitchId: '123',
				youtubeId: '123',
				nickname: 'Test Streamer',
				avatar: 'https://test.com/avatar.png',
				name: 'Test Streamer',
				email: 'test@test.com',
			},
			lastActivity: 1719859200,
			amount: 100,
		},
	],
}
