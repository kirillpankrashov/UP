import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'

import { CampaignType } from '@/core/types/campaign-type'
import { Logger, parseSlug } from '@/core/helpers'
import type { ICampaignStatistics } from '@/modules/Partner/views/Analytics/api'
import * as AnalyticsApi from '@/modules/Partner/views/Analytics/api'

interface State {
	info: {
		title: string
		status: boolean
		updatedAt: string
	}
	data: ICampaignStatistics | null
	isFetching: boolean
}

export const useStatisticsStore = () => {
	const route = useRoute()

	return defineStore('partner-analytics-statistics', {
		state: (): State => ({
			info: {
				title: '',
				status: false,
				updatedAt: '',
			},
			data: null,
			isFetching: false,
		}),

		actions: {
			async fetchCampaignStatistics(
				params: {
					start: string
					end: string
				},
			) {
				try {
					this.isFetching = true

					const res = await AnalyticsApi.getCampaignStatistics({
						campaignType: this.campaignType,
						slug: route.params.campaignSlug as string,
						start: params.start,
						end: params.end,
					})

					this.data = res

					this.setCampaignInfo({
						title: res.title,
						status: res.status,
						updatedAt: res.updatedAt,
					})
				}
				catch (err) {
					Logger.error('Error fetching campaign statistics', false, err)
				}
				finally {
					this.isFetching = false
				}
			},

			setCampaignInfo(info: { title: string; status: boolean; updatedAt: string }) {
				this.info = info
			},

			downloadReport(params: { start: string; end: string; docType?: string }) {
				const docType = params.docType ? `${params.docType}/` : ''
				const slug = route.params.campaignSlug as string

				window.open(`${import.meta.env.VITE_APP_API_URL}statistic/campaigns/${this.campaignType}/campaigns/${slug}/${params.start}/${params.end}/${docType}download`)
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
