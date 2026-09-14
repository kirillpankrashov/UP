import { defineStore } from 'pinia'

import { Logger } from '@/core/helpers'
import type { IHistoryReferral } from '@/modules/Streamer/views/Referrals/api'
import * as ReferralsApi from '@/modules/Streamer/views/Referrals/api'

export interface IReferralsHistoryState {
	isFetching: boolean
	history: {
		data: IHistoryReferral[]
		perPage: number
		total: number
		page: number
	}
}

export const useReferralsHistoryStore = defineStore('referralsHistory', {
	state: (): IReferralsHistoryState => ({
		isFetching: false,
		history: {
			data: [],
			perPage: 0,
			total: 0,
			page: 1,
		},
	}),

	actions: {
		async fetchHistory (page = 1) {
			try {
				this.isFetching = true

				const res = await ReferralsApi.getHistory(page)

				this.history.page = page
				this.history.data = res.data
				this.history.perPage = res.perPage
				this.history.total = res.total
			}
			catch(err) {
				Logger.error('Error fetching user referrals history', true, err)
			}
			finally {
				this.isFetching = false
			}
		},
	},
})
