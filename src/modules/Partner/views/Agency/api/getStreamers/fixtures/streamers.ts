import { CurrencyName } from '@/core/types'
import type { IPaginatedData } from '@/core/types/response'

import type { IStreamer } from '../types'

export const streamers: IPaginatedData<IStreamer[]> = {
	status: true,
	total: 10,
	perPage: 10,
	data: [
		{
			id: 27043,
			name: 'carlssierra',
			lastActivity: '2024-01-01',
			wallet: {
				balance: 1.3243,
				currency: CurrencyName.MXN,
			},
			campaigns: 0,
			checkListStatus: false,
			payableStatus: true,
			ctrStatus: false,
		},
		{
			id: 27044,
			name: 'Delt4Forc3',
			lastActivity: '2024-01-01',
			wallet: {
				balance: 0.2346,
				currency: CurrencyName.MXN,
			},
			campaigns: 0,
			checkListStatus: false,
			payableStatus: true,
			ctrStatus: false,
		},
		{
			id: 27305,
			name: 's3lioh',
			lastActivity: '2024-05-01',
			wallet: {
				balance: 754.0649,
				currency: CurrencyName.MXN,
			},
			campaigns: 13,
			checkListStatus: false,
			payableStatus: true,
			ctrStatus: false,
		},
		{
			id: 27327,
			name: 'ElShadow1832',
			lastActivity: '2024-05-01',
			wallet: {
				balance: 319.3125,
				currency: CurrencyName.MXN,
			},
			campaigns: 8,
			checkListStatus: false,
			payableStatus: true,
			ctrStatus: false,
		},
		{
			id: 27391,
			name: 'arturbloodshot',
			lastActivity: '2024-05-01',
			wallet: {
				balance: 8.398,
				currency: CurrencyName.MXN,
			},
			campaigns: 4,
			checkListStatus: false,
			payableStatus: true,
			ctrStatus: false,
		},
		{
			id: 27486,
			name: 'extremebreaker1',
			lastActivity: '2024-05-01',
			wallet: {
				balance: 77.7575,
				currency: CurrencyName.MXN,
			},
			campaigns: 7,
			checkListStatus: false,
			payableStatus: true,
			ctrStatus: false,
		},
		{
			id: 31248,
			name: 'Luismih_',
			lastActivity: '2024-04-19',
			wallet: {
				balance: 0,
				currency: CurrencyName.MXN,
			},
			campaigns: 0,
			checkListStatus: false,
			payableStatus: true,
			ctrStatus: false,
		},
	],
}