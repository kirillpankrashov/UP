import { defineStore } from 'pinia'

import { Logger } from '@/core/helpers/Logger'
import type {
	IReferral,
	IReferralHistoryDetail,
	IReferralHistoryItem,
	IReferralStreamer,
} from '@/modules/Partner/views/Agency/api'
import * as AgencyApi from '@/modules/Partner/views/Agency/api'

interface State {
  referral: {
    isFetching: boolean
    isFetched: boolean
    data: null | IReferral
  }
  streamers: {
    isFetched: boolean
    isFetching: boolean
    amount: number
    data: IReferralStreamer[]
  }
  history: {
    isFetched: boolean
    isFetching: boolean
    page: number
    perPage: number
    total: number
		amount: number
    data: IReferralHistoryItem[]
  }
  historyDetail: {
		isFetched: boolean
		isFetching: boolean
		page: number
		perPage: number
		total: number
		data: IReferralHistoryDetail[]
	}
}

export const useAgencyReferralStore = defineStore('partner-agency-referral', {
	state: (): State => ({
		referral: {
			isFetching: false,
			isFetched: false,
			data: null,
		},
		streamers: {
			isFetched: false,
			isFetching: false,
			amount: 0,
			data: [],
		},
		history: {
			isFetched: false,
			isFetching: false,
			page: 1,
			perPage: 25,
			total: 0,
			amount: 0,
			data: [],
		},
		historyDetail: {
			isFetched: false,
			isFetching: false,
			page: 1,
			perPage: 25,
			total: 0,
			data: [],
		},
	}),

	actions: {
		async fetchReferral () {
			if (this.referral.isFetching) return

			try {
				this.referral.isFetching = true

				const res = await AgencyApi.getReferral()

				this.referral.data = res
			}
			catch (err) {
				Logger.error('Error fetching referral', true, err)
			}
			finally {
				this.referral.isFetching = false
			}
		},

		async fetchReferralStreamers () {
			if (this.streamers.isFetching) return

			try {
				this.streamers.isFetching = true

				const res = await AgencyApi.getReferralStreamers()

				this.streamers.data = res.data
				this.streamers.amount = res.amount
				this.streamers.isFetched = true
			}
			catch (err) {
				Logger.error('Error fetching referral streamers', true, err)
			}
			finally {
				this.streamers.isFetching = false
			}
		},

		async fetchReferralHistory (page?: number) {
			if (this.history.isFetching && !page) return

			try {
				if (page) {
					this.history.page = page
				}

				this.history.isFetching = true

				const res = await AgencyApi.getReferralsHistory(this.history.page)

				this.history.data = [
					...this.history.data,
					...res.data,
				]
				this.history.amount = res.amount
				this.history.perPage = res.perPage
				this.history.total = res.total
				this.history.isFetched = true
			}
			catch (err) {
				Logger.error('Error fetching referral history', true, err)
			}
			finally {
				this.history.isFetching = false
			}
		},

		async fetchReferralHistoryDetail (date: string) {
			try {
				this.historyDetail.isFetching = true

				const res = await AgencyApi.getReferralsHistoryDetail(date)

				this.historyDetail.data = res.data
				this.historyDetail.isFetched = true
				this.historyDetail.perPage = res.perPage
				this.historyDetail.total = res.total
			}
			catch (err) {
				Logger.error('Error fetching referral history detail', true, err)
			}
			finally {
				this.historyDetail.isFetching = false
			}
		},
	},
})
