import moment from 'moment'
import { defineStore } from 'pinia'

import { Logger } from '@/core/helpers'
import type { IAdsetAnalyticsDay } from '@/modules/Streamer/views/Campaigns/api'
import * as CampaignsApi from '@/modules/Streamer/views/Campaigns/api'
import type { IActiveAdset } from '@/modules/Streamer/views/Campaigns/types'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

const getDatesDays = (dates: [Date, Date]): [string, string] => {
	return [
		moment(dates[0]).format('YYYY-MM-DD'),
		moment(dates[1]).format('YYYY-MM-DD'),
	]
}

interface State {
  isActive: boolean
  isFetchingData: boolean
	currentAdset: IActiveAdset | null
  data: IAdsetAnalyticsDay[]
  campaignDates: [Date, Date]
  currentDates: [Date, Date]
}

export const useCampaignAnalyticsStore = defineStore('campaignAnalytics', {
	state: (): State => ({
		isActive: false,
		isFetchingData: false,
		currentAdset: null,
		data: [],
		campaignDates: [new Date(), new Date()],
		currentDates: [new Date(), new Date()],
	}),

	actions: {
		setCampaignData (adset: IActiveAdset) {
			this.currentAdset = adset
			this.campaignDates = [
				moment(adset.dates.start, 'DD.MM.YYYY').toDate(),
				moment(adset.dates.end, 'DD.MM.YYYY').toDate(),
			]
			this.currentDates = [...this.campaignDates]
		},

		async fetchData () {
			const streamerStore = useStreamerStore()

			if (!streamerStore.profile) {
				Logger.error('Streamer profile not found')
				return
			}

			if (!this.currentAdset || !this.currentDates[0] || !this.currentDates[1]) {
				return
			}

			try {
				this.isFetchingData = true

				const res = await CampaignsApi.getAdsetAnalytics({
					streamerId: streamerStore.profile.userId,
					slug: this.currentAdset.slug,
					start: getDatesDays(this.currentDates)[0],
					end: getDatesDays(this.currentDates)[1],
				})

				this.data = res.data
				this.isFetchingData = false
			}
			catch (err) {
				Logger.error('Error fetching adset analytics', true, err)
			}
			finally {
				this.isFetchingData = false
			}
		},

		async showAnalytics (adset: IActiveAdset) {
			this.setCampaignData(adset)

			await this.fetchData()

			if (this.data.length) {
				this.isActive = true
			}
		},

		closeAnalytics () {
			this.isActive = false
			this.currentAdset = null
			this.campaignDates = [new Date(), new Date()]
			this.currentDates = [new Date(), new Date()]
		},
	},
})
