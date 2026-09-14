import moment from 'moment'
import { defineStore } from 'pinia'

import { Logger } from '@/core/helpers'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import * as WalletApi from '@/modules/Streamer/views/Wallet/api'
import { type IWalletAnalyticsDay } from '@/modules/Streamer/views/Wallet/api'

const getMonthEdgeDays = (month: Date): [string, string] => {
	const startOfMonth = moment(month).startOf('month').format('YYYY-MM-DD')
	const endOfMonth = moment(month).endOf('month').format('YYYY-MM-DD')
	return [startOfMonth, endOfMonth]
}

export interface IAnalyticsState {
  isFetchingData: boolean
  month: Date
  data: IWalletAnalyticsDay[]
}

export const useWalletAnalyticsStore = defineStore('walletAnalytics', {
	state: (): IAnalyticsState => ({
		isFetchingData: false,
		month: new Date(),
		data: [],
	}),

	actions: {
		async fetchAnalytics () {
			const streamerStore = useStreamerStore()

			if (!streamerStore.profile) {
				Logger.error('No streamer data fetchet yet!', false)
				return
			}

			try {
				this.isFetchingData = true
				this.data = await WalletApi.getAnalytics(
					streamerStore.profile.userId,
					...getMonthEdgeDays(this.month),
				)
			}
			catch(err) {
				Logger.error('Error fetching user wallet analytics', true, err)
			}
			finally {
				this.isFetchingData = false
			}
		},
	},
})
