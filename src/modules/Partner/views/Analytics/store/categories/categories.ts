import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'

import { CampaignType } from '@/core/types'
import { Logger, parseSlug } from '@/core/helpers'
import type { ICategoriesImperssions, ICategoryDistribution } from '@/modules/Partner/views/Analytics/api'
import * as AnalyticsApi from '@/modules/Partner/views/Analytics/api'
import { useStatisticsStore } from '@/modules/Partner/views/Analytics/store'

interface State {
	impressions: {
		data: ICategoriesImperssions['categories'] | null
		perPage: number
		total: number
		page: number
		loading: boolean
	}
	distribution: {
		data: ICategoryDistribution[] | null
		loading: boolean
	}
}

export const useCategoriesStore = () => {
	const route = useRoute()

	const statisticsStore = useStatisticsStore()

	return defineStore('partner-analytics-categories', {
		state: (): State => ({
			impressions: {
				data: null,
				perPage: 0,
				total: 0,
				page: 1,
				loading: false,
			},
			distribution: {
				data: null,
				loading: false,
			},
		}),

		actions: {
			async fetchCategoriesImpressions(
				params: {
					start: string
					end: string
					page: number
				},
			) {
				try {
					this.impressions.loading = true

					const res = await AnalyticsApi.getCategoriesImperssions({
						campaignType: statisticsStore.campaignType,
						slug: route.params.campaignSlug as string,
						start: params.start,
						end: params.end,
						page: params.page,
					})

					this.impressions.data = res.data.categories
					this.impressions.perPage = res.perPage
					this.impressions.total = res.total
					this.impressions.page = params.page

					statisticsStore.setCampaignInfo({
						title: res.data.title,
						status: res.data.status,
						updatedAt: res.data.updatedAt,
					})
				}
				catch (err) {
					Logger.error('Error fetching categories impressions', false, err)
				}
				finally {
					this.impressions.loading = false
				}
			},

			async fetchCategoriesDistribution(
				params: {
					start: string
					end: string
				},
			) {
				try {
					this.distribution.loading = true

					const res = await AnalyticsApi.getCategoriesDistribution({
						campaignType: statisticsStore.campaignType,
						slug: route.params.campaignSlug as string,
						start: params.start,
						end: params.end,
					})

					this.distribution.data = res
				}
				catch (err) {
					Logger.error('Error fetching categories distribution', false, err)
				}
				finally {
					this.distribution.loading = false
				}
			},

			downloadReport(params: { start: string; end: string; docType?: string }) {
				const docType = params.docType ? `${params.docType}/` : ''
				const slug = route.params.campaignSlug as string

				window.open(`${import.meta.env.VITE_APP_API_URL}statistic/campaigns/${this.campaignType}/categories/${slug}/${params.start}/${params.end}/${docType}download`)
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
