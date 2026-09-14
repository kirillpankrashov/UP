import { useRoute, useRouter } from 'vue-router'
import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'

import { AdEntityType,CampaignType } from '@/core/types'
import { Logger } from '@/core/helpers'
import { RouteName } from '@/modules/Partner/router'
import * as CampaignsApi from '@/modules/Partner/views/Campaigns/api'
import type { AdEntity } from '@/modules/Partner/views/Campaigns/types'

const collectionApi = new Map()

collectionApi.set(`${CampaignType.BRAND_AWARENESS}:${AdEntityType.CAMPAIGNS}`, CampaignsApi.getBrandAwarenessCampaigns)
collectionApi.set(`${CampaignType.BRAND_AWARENESS}:${AdEntityType.ADSETS}`, CampaignsApi.getBrandAwarenessAdsets)
collectionApi.set(`${CampaignType.BRAND_AWARENESS}:${AdEntityType.CREATIVES}`, CampaignsApi.getBrandAwarenessCreatives)

collectionApi.set(`${CampaignType.PERFORMANCE}:${AdEntityType.CAMPAIGNS}`, CampaignsApi.getPerformanceCampaigns)
collectionApi.set(`${CampaignType.PERFORMANCE}:${AdEntityType.ADSETS}`, CampaignsApi.getPerformanceAdsets)

collectionApi.set(`${CampaignType.PREROLL}:${AdEntityType.CAMPAIGNS}`, CampaignsApi.getPrerollCampaigns)
collectionApi.set(`${CampaignType.PREROLL}:${AdEntityType.ADSETS}`, CampaignsApi.getPrerollAdsets)

collectionApi.set(`${CampaignType.EXTENSION}:${AdEntityType.CAMPAIGNS}`, CampaignsApi.getExtensionCampaigns)
collectionApi.set(`${CampaignType.EXTENSION}:${AdEntityType.ADSETS}`, CampaignsApi.getExtensionAdsets)
collectionApi.set(`${CampaignType.EXTENSION}:${AdEntityType.CREATIVES}`, CampaignsApi.getExtensionCreatives)

collectionApi.set(`${CampaignType.SPECIAL_PROJECT}:${AdEntityType.CAMPAIGNS}`, CampaignsApi.getSpecialProjectCampaigns)
collectionApi.set(`${CampaignType.SPECIAL_PROJECT}:${AdEntityType.ADSETS}`, CampaignsApi.getSpecialProjectAdsets)
collectionApi.set(`${CampaignType.SPECIAL_PROJECT}:${AdEntityType.CREATIVES}`, CampaignsApi.getSpecialProjectCreatives)

interface ICollection {
	bootstrapped: boolean
	perPage: number
	sidebarPage: number
	total: number
	loading: boolean
	items: AdEntity[]
}
export interface State {
	campaigns: ICollection
	adsets: ICollection
	creatives: ICollection
	campaignsSidebarVisible: boolean
	adsetsSidebarVisisble: boolean
}

const defaultCollection: ICollection = {
	bootstrapped: false,
	perPage: 10,
	sidebarPage: 1,
	total: 0,
	loading: false,
	items: [],
}

export const useCampaignsStore = () => {
	const router = useRouter()
	const route = useRoute()

	return defineStore('partner-campaigns', {
		state: (): State => ({
			campaigns: cloneDeep(defaultCollection),
			adsets: cloneDeep(defaultCollection),
			creatives: cloneDeep(defaultCollection),
			campaignsSidebarVisible: false,
			adsetsSidebarVisisble: false,
		}),

		actions: {
			async changeStatus(slug: string, campaignType?: CampaignType | null, adEntityType?: AdEntityType | null) {
				if (!campaignType) {
					campaignType = this.campaignType
				}

				if (!adEntityType) {
					adEntityType = this.adEntityType
				}

				if (campaignType === null || adEntityType === null) {
					return
				}

				try {
					const res = await CampaignsApi.toggleStatus(campaignType, adEntityType, slug)

					if (res.status) {
						const item = this[adEntityType].items.find(item => item.slug === slug)

						if (item) {
							item.visible = !item?.visible
						}
					}
				}
				catch (err) {
					Logger.error(`Error changing status for ${slug}`, true, err)
				}
			},

			async fetchCollection({
				campaignType = null,
				adEntityType = null,
				page = null,
				isSidebar = false,
			}: {
				campaignType?: CampaignType | null
				adEntityType?: AdEntityType | null
				page?: number | null
				isSidebar?: boolean
			} = {}) {
				if (!campaignType) {
					campaignType = this.campaignType
				}

				if (!adEntityType) {
					adEntityType = this.adEntityType
				}

				if (campaignType === null || adEntityType === null) {
					return
				}

				try {
					this[adEntityType].loading = true

					let params: Record<string, any> = {
						...router.currentRoute.value?.query,
					}

					if (isSidebar && page) {
						params = {}

						if (page) {
							params.page = page
						}
					}

					const key = `${campaignType}:${adEntityType}`
					const res = await collectionApi.get(key)(params)

					this[adEntityType].perPage = res.perPage
					this[adEntityType].total = res.total
					this[adEntityType].items = res.data
					this[adEntityType].bootstrapped = true

					if (isSidebar && page) {
						this[adEntityType].sidebarPage = page
					}
				}
				catch (err) {
					Logger.error(`Error fetching ${adEntityType} ${campaignType}`, true, err)
				}
				finally {
					this[adEntityType].loading = false
				}
			},
		},

		getters: {
			collectionLoading: (state) => state.campaigns.loading || state.adsets.loading || state.creatives.loading,

			campaignType: () => {
				switch (route.name) {
					case RouteName.BRAND_AWARENESS_CAMPAIGNS:
					case RouteName.BRAND_AWARENESS_ADSETS:
					case RouteName.BRAND_AWARENESS_CREATIVES:
						return CampaignType.BRAND_AWARENESS
					case RouteName.PERFORMANCE_CAMPAIGNS:
					case RouteName.PERFORMANCE_ADSETS:
						return CampaignType.PERFORMANCE
					case RouteName.PREROLL_CAMPAIGNS:
					case RouteName.PREROLL_ADSETS:
						return CampaignType.PREROLL
					case RouteName.EXTENSION_CAMPAIGNS:
					case RouteName.EXTENSION_ADSETS:
					case RouteName.EXTENSION_CREATIVES:
						return CampaignType.EXTENSION
					case RouteName.SPECIAL_PROJECT_CAMPAIGNS:
					case RouteName.SPECIAL_PROJECT_ADSETS:
					case RouteName.SPECIAL_PROJECT_CREATIVES:
						return CampaignType.SPECIAL_PROJECT
					default:
						return null
				}
			},
			adEntityType: () => {
				switch (route.name) {
					case RouteName.BRAND_AWARENESS_CAMPAIGNS:
					case RouteName.PERFORMANCE_CAMPAIGNS:
					case RouteName.PREROLL_CAMPAIGNS:
					case RouteName.EXTENSION_CAMPAIGNS:
					case RouteName.SPECIAL_PROJECT_CAMPAIGNS:
						return AdEntityType.CAMPAIGNS
					case RouteName.BRAND_AWARENESS_ADSETS:
					case RouteName.PERFORMANCE_ADSETS:
					case RouteName.PREROLL_ADSETS:
					case RouteName.EXTENSION_ADSETS:
					case RouteName.SPECIAL_PROJECT_ADSETS:
						return AdEntityType.ADSETS
					case RouteName.BRAND_AWARENESS_CREATIVES:
					case RouteName.EXTENSION_CREATIVES:
					case RouteName.SPECIAL_PROJECT_CREATIVES:
						return AdEntityType.CREATIVES
					default:
						return null
				}
			},
			campaignTypeCollection: () => {
				const campaignTypeCollection = new Map()

				campaignTypeCollection.set(CampaignType.BRAND_AWARENESS, [AdEntityType.CAMPAIGNS, AdEntityType.ADSETS, AdEntityType.CREATIVES])
				campaignTypeCollection.set(CampaignType.PERFORMANCE, [AdEntityType.CAMPAIGNS, AdEntityType.ADSETS])
				campaignTypeCollection.set(CampaignType.PREROLL, [AdEntityType.CAMPAIGNS, AdEntityType.ADSETS])
				campaignTypeCollection.set(CampaignType.EXTENSION, [AdEntityType.CAMPAIGNS, AdEntityType.ADSETS, AdEntityType.CREATIVES])
				campaignTypeCollection.set(CampaignType.SPECIAL_PROJECT, [AdEntityType.CAMPAIGNS, AdEntityType.ADSETS, AdEntityType.CREATIVES])

				return campaignTypeCollection
			},
			collectionRoute: () => {
				const collectionRoute = new Map()

				collectionRoute.set(`${CampaignType.BRAND_AWARENESS}:${AdEntityType.CAMPAIGNS}`, RouteName.BRAND_AWARENESS_CAMPAIGNS)
				collectionRoute.set(`${CampaignType.BRAND_AWARENESS}:${AdEntityType.ADSETS}`, RouteName.BRAND_AWARENESS_ADSETS)
				collectionRoute.set(`${CampaignType.BRAND_AWARENESS}:${AdEntityType.CREATIVES}`, RouteName.BRAND_AWARENESS_CREATIVES)

				collectionRoute.set(`${CampaignType.PERFORMANCE}:${AdEntityType.CAMPAIGNS}`, RouteName.PERFORMANCE_CAMPAIGNS)
				collectionRoute.set(`${CampaignType.PERFORMANCE}:${AdEntityType.ADSETS}`, RouteName.PERFORMANCE_ADSETS)

				collectionRoute.set(`${CampaignType.PREROLL}:${AdEntityType.CAMPAIGNS}`, RouteName.PREROLL_CAMPAIGNS)
				collectionRoute.set(`${CampaignType.PREROLL}:${AdEntityType.ADSETS}`, RouteName.PREROLL_ADSETS)

				collectionRoute.set(`${CampaignType.EXTENSION}:${AdEntityType.CAMPAIGNS}`, RouteName.EXTENSION_CAMPAIGNS)
				collectionRoute.set(`${CampaignType.EXTENSION}:${AdEntityType.ADSETS}`, RouteName.EXTENSION_ADSETS)
				collectionRoute.set(`${CampaignType.EXTENSION}:${AdEntityType.CREATIVES}`, RouteName.EXTENSION_CREATIVES)

				collectionRoute.set(`${CampaignType.SPECIAL_PROJECT}:${AdEntityType.CAMPAIGNS}`, RouteName.SPECIAL_PROJECT_CAMPAIGNS)
				collectionRoute.set(`${CampaignType.SPECIAL_PROJECT}:${AdEntityType.ADSETS}`, RouteName.SPECIAL_PROJECT_ADSETS)
				collectionRoute.set(`${CampaignType.SPECIAL_PROJECT}:${AdEntityType.CREATIVES}`, RouteName.SPECIAL_PROJECT_CREATIVES)

				return collectionRoute
			},
		},
	})()
}
