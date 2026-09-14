import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'

import { CampaignType } from '@/core/types'
import { Logger, parseSlug } from '@/core/helpers'
import type { IStreamersStatistics } from '@/modules/Partner/views/Analytics/api'
import * as AnalyticsApi from '@/modules/Partner/views/Analytics/api'
import { useStatisticsStore } from '@/modules/Partner/views/Analytics/store'

interface State {
	data: IStreamersStatistics['streamers'] | null
	perPage: number
	total: number
	page: number
	isFetching: boolean
}

export const useStreamersStore = () => {
	const route = useRoute()

	const statisticsStore = useStatisticsStore()

	return defineStore('partner-analytics-streamers', {
		state: (): State => ({
			data: null,
			perPage: 0,
			total: 0,
			page: 1,
			isFetching: false,
		}),

		actions: {
			async fetchStreamers(
				params: {
					start: string
					end: string
					page: number
					sortBy?: string
					sortDirection?: 'asc' | 'desc'
				},
			) {
				try {
					this.isFetching = true

					const res = await AnalyticsApi.getStreamersStatistics({
						campaignType: statisticsStore.campaignType,
						slug: route.params.campaignSlug as string,
						start: params.start,
						end: params.end,
						page: params.page,
						sortBy: params.sortBy,
						sortDirection: params.sortDirection,
					})

					this.data = res.data.streamers
					this.perPage = res.perPage
					this.total = res.total
					this.page = params.page

					statisticsStore.setCampaignInfo({
						title: res.data.title,
						status: res.data.status,
						updatedAt: res.data.updatedAt,
					})
				}
				catch (err) {
					Logger.error('Error fetching creators', false, err)
				}
				finally {
					this.isFetching = false
				}
			},

			downloadReport(params: { start: string; end: string; docType?: string }) {
				const docType = params.docType ? `${params.docType}/` : ''
				const slug = route.params.campaignSlug as string

				window.open(`${import.meta.env.VITE_APP_API_URL}statistic/campaigns/${this.campaignType}/creators/${slug}/${params.start}/${params.end}/${docType}download`)
			},
		},

		getters: {
			campaignType: () => {
				const slug = route.params.campaignSlug as string
				const { campaignType } = parseSlug(slug)

				if (campaignType === CampaignType.BRAND_AWARENESS) {
					return 'brand-awareness'
				}

				return campaignType
			},
		},
	})()
}
