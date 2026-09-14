import { CurrencyName } from '@/core/types'
import type { IPaginatedData } from '@/core/types/response'

import type { IAdsetStreamer } from '../types'

export const adsetStreamers: IPaginatedData<IAdsetStreamer[]> = {
	status: true,
	total: 1,
	perPage: 1,
	data: [{
		nickname: 'test',
		revenue: 100,
		currency: CurrencyName.USD,
		impressions: 100,
		averageCtr: 100,
		dailyCtr: 100,
		status: 'active',
	}],
}