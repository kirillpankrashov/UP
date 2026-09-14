import moment from 'moment'
import { defineStore } from 'pinia'

import type { ILinkTopSupporter } from '@/core/types/link'
import { Logger } from '@/core/helpers'
import type { ILinkAnalytics, ILinkStatistics, ILinkTops } from '@/modules/Streamer/views/Link/api'
import * as LinkApi from '@/modules/Streamer/views/Link/api'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

export enum TopList {
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  WEEK = 'week',
  MONTH = 'month',
  ALLTIME = 'alltime',
  PERIOD = 'period',
}

interface State {
	analytics: null | ILinkAnalytics
  analyticsLoading: boolean
	statistics: null | ILinkStatistics
  statisticsLoading: boolean
	tops: null | ILinkTops
	topsLoading: boolean
	currentList: TopList
	topPeriod: {
		data: ILinkTopSupporter[]
		date: number[] | string[] | Date[]
	}
	topPeriodLoading: boolean
}

export const useLinkAnalyticsStore = defineStore('linkAnalytics', {
	state: (): State => ({
		analytics: null,
		analyticsLoading: false,
		statistics: null,
		statisticsLoading: false,
		tops: null,
		topsLoading: false,
		currentList: TopList.TODAY,
		topPeriod: {
			data: [],
			date: ['', ''],
		},
		topPeriodLoading: false,
	}),

	actions: {
		async fetchAnalytics () {
			const streamerStore = useStreamerStore()

			if (!streamerStore.streamerId) {
				Logger.error('No streamer data fetched yet', false)
				return
			}

			try {
				this.analyticsLoading = true
				this.analytics = await LinkApi.getAnalytics()
			}
			catch(err) {
				Logger.error('Error fetching streamer link analytics', true, err)
			}
			finally {
				this.analyticsLoading = false
			}
		},

		async fetchStatistics () {
			const streamerStore = useStreamerStore()

			if (!streamerStore.streamerId) {
				Logger.error('No streamer data fetched yet', false)
				return
			}

			try {
				this.statisticsLoading = true
				this.statistics = await LinkApi.getStatistics()
			}
			catch(err) {
				Logger.error('Error fetching streamer link statistics', true, err)
			}
			finally {
				this.statisticsLoading = false
			}
		},

		async fetchTops () {
			const streamerStore = useStreamerStore()

			if (!streamerStore.streamerId) {
				Logger.error('No streamer data fetched yet', false)
				return
			}

			try {
				this.topsLoading = true
				this.tops = await LinkApi.getTops()
			}
			catch(err) {
				Logger.error('Error fetching streamer tops', true, err)
			}
			finally {
				this.topsLoading = false
			}
		},

		async fetchPeriod () {
			const streamerStore = useStreamerStore()

			if (!streamerStore.streamerId) {
				Logger.error('No streamer data fetched yet', false)
				return
			}

			if(!this.topPeriod.date) {
				Logger.error('There is no date selected', true)
				return
			}

			this.topPeriodLoading = true

			try {
				this.topPeriod.data = await LinkApi.getTopByPeriod(
					moment(this.topPeriod.date[0]).format('DD-MM-YYYY'),
					moment(this.topPeriod.date[1]).format('DD-MM-YYYY'),
				)
			}
			catch(err) {
				Logger.error('Error fetching streamer top by period', true, err)
			}
			finally {
				this.topPeriodLoading = false
			}
		},
	},
	getters: {
		topList (state) {
			switch (state.currentList) {
				case TopList.TODAY:
					return state.tops?.today || []
				case TopList.YESTERDAY:
					return state.tops?.yesterday || []
				case TopList.WEEK:
					return state.tops?.week || []
				case TopList.MONTH:
					return state.tops?.month || []
				case TopList.ALLTIME:
					return state.tops?.allTime || []
				case TopList.PERIOD:
					return state.topPeriod.data || []
				default:
					return []
			}
		},
	},
})
