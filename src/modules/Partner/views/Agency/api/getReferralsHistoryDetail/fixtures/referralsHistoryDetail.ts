import type { IPaginatedData } from '@/core/types/response'

import type { IReferralHistoryDetail } from '../types'

export const referralsHistoryDetail: IPaginatedData<IReferralHistoryDetail[]> = {
	'status': true,
	'total': 1,
	'perPage': 1,
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
			amount: 100,
		},
	],
}