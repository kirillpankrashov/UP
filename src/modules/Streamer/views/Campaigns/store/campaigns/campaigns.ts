import { defineStore } from 'pinia'

import { AdsetStatus, CampaignType, type IResponseMessage, Platform } from '@/core/types'
import { isExternalMediaFormat, isSspTextFormat, Logger } from '@/core/helpers'
import type {
	IBrandAwarenessAdsetShort,
	IBrandAwarenessCompletedAdset,
	IExtensionAdsetShort,
	IPerformanceAdsetShort,
	IPerformanceCompletedAdset,
	IPrerollAdset,
	IPrerollCompletedAdset,
	ISpecialProjectAdset,
} from '@/modules/Streamer/views/Campaigns/api'
import * as CampaignsApi from '@/modules/Streamer/views/Campaigns/api'
import type { IActiveAdset, IActiveAdsetInfo } from '@/modules/Streamer/views/Campaigns/types'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

interface IActiveCampaigns<T> {
	active: Array<T>
	inactive: Array<T>
	future: Array<T>
	unavailable: Array<T>
}

export interface State {
	isFetchingActiveCampaigns: boolean
	isFetchingCompletedCampaigns: boolean
	isFetchingAdsetInfo: boolean
	adsetInfoSidebarVisible: boolean
	counters: {
		active: number | null
		completed: number | null
	}
	activeCampaignsShort: {
		data: IActiveCampaigns<IBrandAwarenessAdsetShort | IPerformanceAdsetShort | IExtensionAdsetShort>
	}
	activeCampaigns: {
		data: IActiveCampaigns<IActiveAdset>
	}
	activePrerollCampaigns: IPrerollAdset[]
	activeSpecialProjectCampaigns: {
		data: IActiveCampaigns<ISpecialProjectAdset>
	}
	completedCampaigns: {
		page: number
		perPage: number
		total: number
		data: Array<IBrandAwarenessCompletedAdset | IPerformanceCompletedAdset>
	}
	completedPrerollCampaigns: {
		page: number
		perPage: number
		total: number
		data: Array<IPrerollCompletedAdset>
	}
	adsetInfo: IActiveAdsetInfo | null
}

export const useCampaignsStore = defineStore('campaigns', {
	state: (): State => ({
		isFetchingActiveCampaigns: false,
		isFetchingCompletedCampaigns: false,
		isFetchingAdsetInfo: false,
		counters: {
			active: null,
			completed: null,
		},
		activeCampaignsShort: {
			data: {
				active: [],
				future: [],
				inactive: [],
				unavailable: [],
			},
		},
		activeCampaigns: {
			data: {
				active: [],
				future: [],
				inactive: [],
				unavailable: [],
			},
		},
		activePrerollCampaigns: [],
		activeSpecialProjectCampaigns: {
			data: {
				active: [],
				future: [],
				inactive: [],
				unavailable: [],
			},
		},
		completedCampaigns: {
			page: 1,
			perPage: 0,
			total: 0,
			data: [],
		},
		completedPrerollCampaigns: {
			page: 1,
			perPage: 0,
			total: 0,
			data: [],
		},
		adsetInfo: null,
		adsetInfoSidebarVisible: false,
	}),

	actions: {
		async fetchCampaigns(isShort: boolean) {
			const settingsStore = useSettingsStore()

			if (!settingsStore.widget) {
				Logger.error('There is no widget yet', true)
				return
			}

			const { platform, brandisExtensionEnabled, extensionEnabled } = settingsStore.widget

			try {
				this.isFetchingActiveCampaigns = true

				const fetchBaAdsets = isShort ? CampaignsApi.getBrandAwarenessAdsetsShort : CampaignsApi.getBrandAwarenessAdsets
				const fetchPfAdsets = isShort ? CampaignsApi.getPerformanceAdsetsShort : CampaignsApi.getPerformanceAdsets
				const fetchExtAdsets = isShort ? CampaignsApi.getExtensionAdsetsShort : CampaignsApi.getExtensionAdsets

				const [baCampaigns, pfCampaigns, extCampaigns] = await Promise.all([
					fetchBaAdsets(),
					platform === Platform.TWITCH ? fetchPfAdsets() : Promise.resolve(null),
					platform === Platform.TWITCH ? fetchExtAdsets() : Promise.resolve(null),
				])

				const campaigns: any = {
					active: baCampaigns.active,
					inactive: [
						...baCampaigns.inactive,
						...baCampaigns.unavailable,
					],
					future: baCampaigns.future,
					unavailable: [],
				}

				if (platform === Platform.TWITCH && pfCampaigns) {
					if (!brandisExtensionEnabled) {
						campaigns.inactive.push(
							...pfCampaigns.active,
							...pfCampaigns.inactive,
							...pfCampaigns.future,
							...pfCampaigns.unavailable,
						)
					}
					else {
						campaigns.active.push(...pfCampaigns.active)
						campaigns.inactive.push(
							...pfCampaigns.inactive,
							...pfCampaigns.unavailable,
						)
						campaigns.future.push(...pfCampaigns.future)
					}
				}

				if (platform === Platform.TWITCH && extCampaigns) {
					if (!extensionEnabled) {
						campaigns.inactive.push(
							...extCampaigns.active,
							...extCampaigns.inactive,
							...extCampaigns.future,
							...extCampaigns.unavailable,
						)
					}
					else {
						campaigns.active.push(...extCampaigns.active)
						campaigns.inactive.push(
							...extCampaigns.inactive,
							...extCampaigns.unavailable,
						)
						campaigns.future.push(...extCampaigns.future)
					}
				}

				if (isShort) {
					this.activeCampaignsShort.data = campaigns as IActiveCampaigns<IBrandAwarenessAdsetShort | IPerformanceAdsetShort | IExtensionAdsetShort>
				}
				else {
					this.activeCampaigns.data = campaigns as IActiveCampaigns<IActiveAdset>
					this.activeCampaignsShort.data = campaigns as IActiveCampaigns<IBrandAwarenessAdsetShort | IPerformanceAdsetShort | IExtensionAdsetShort>
				}
			}
			catch (err) {
				Logger.error('Error fetching active campaigns', true, err)
			}
			finally {
				this.isFetchingActiveCampaigns = false
			}
		},

		async fetchPrerollActiveCampaigns () {
			try {
				this.isFetchingActiveCampaigns = true

				const res = await CampaignsApi.getPrerollAdsets()

				this.activePrerollCampaigns = res
			}
			catch (err) {
				Logger.error('Error fetching preroll active campaigns', true, err)
			}
			finally {
				this.isFetchingActiveCampaigns = false
			}
		},
		async fetchSpecialProjectActiveCampaigns () {
			try {
				this.isFetchingActiveCampaigns = true

				const res = await CampaignsApi.getSpecialProjectAdsets()

				this.activeSpecialProjectCampaigns.data = res
			}
			catch (err) {
				Logger.error('Error fetching special project active campaigns', true, err)
			}
			finally {
				this.isFetchingActiveCampaigns = false
			}
		},

		async fetchActiveCampaignsShort () {
			await this.fetchCampaigns(true)
		},

		async fetchActiveCampaigns () {
			await this.fetchCampaigns(false)
		},

		async fetchCompletedCampaigns () {
			try {
				this.isFetchingCompletedCampaigns = true

				const res = await CampaignsApi.getBrandAwarenessCompletedAdsets(this.completedCampaigns.page)

				this.completedCampaigns.data = res.data
				this.completedCampaigns.perPage = res.perPage
				this.completedCampaigns.total = res.total
			}
			catch (err) {
				Logger.error('Error fetching completed campaigns', true, err)
			}
			finally {
				this.isFetchingCompletedCampaigns = false
			}
		},

		async fetchCompletedPrerollCampaigns () {
			try {
				this.isFetchingCompletedCampaigns = true

				const res = await CampaignsApi.getPrerollCompletedAdsets(this.completedPrerollCampaigns.page)

				this.completedPrerollCampaigns.data = res.data
				this.completedPrerollCampaigns.perPage = res.perPage
				this.completedPrerollCampaigns.total = res.total
			}
			catch (err) {
				Logger.error('Error fetching completed preroll campaigns', true, err)
			}
			finally {
				this.isFetchingCompletedCampaigns = false
			}
		},

		async fetchAdsetInfo (adset: IActiveAdset) {
			try {
				this.isFetchingAdsetInfo = true

				let res

				switch (adset.campaignType) {
					case CampaignType.BRAND_AWARENESS:
						res = await CampaignsApi.getBrandAwarenessAdsetInfo(adset.slug)
						break
					case CampaignType.PERFORMANCE:
						res = await CampaignsApi.getPerformanceAdsetInfo(adset.slug)
						break
					case CampaignType.PREROLL:
						res = await CampaignsApi.getPrerollAdsetInfo(adset.slug)
						break
					case CampaignType.EXTENSION:
						res = await CampaignsApi.getExtensionAdsetInfo(adset.slug)
						break
					case CampaignType.SPECIAL_PROJECT:
						res = await CampaignsApi.getSpecialProjectAdsetInfo(adset.slug)
						break
				}

				this.adsetInfo = res
			}
			catch (err) {
				Logger.error('Error fetching adset info', true, err)
			}
			finally {
				this.isFetchingAdsetInfo = false
			}
		},

		async changeCampaignStatus (adset: IActiveAdset) {
			try {
				await CampaignsApi.toggleAdsetVisibility({
					campaignType: adset.campaignType,
					slug: adset.slug,
					visible: adset.status === AdsetStatus.ACTIVE,
				})

				await this.fetchActiveCampaigns()
			}
			catch (err) {
				Logger.error('Error updating campaign status', true, err)
			}
		},

		async changeSspMediaCampaignsStatuses (isActive: boolean) {
			try {
				this.isFetchingActiveCampaigns = true

				const requests: Promise<IResponseMessage>[] = []
				const list = isActive ? this.activeCampaignsShort.data.inactive : this.activeCampaignsShort.data.active
				const campaignStatus = isActive ? AdsetStatus.INACTIVE : AdsetStatus.ACTIVE
				const sspMediaAdsets = list.filter((adset: IBrandAwarenessAdsetShort | IPerformanceAdsetShort | IExtensionAdsetShort) => isExternalMediaFormat(adset.format) && adset.status === campaignStatus)

				sspMediaAdsets.forEach((adset: IBrandAwarenessAdsetShort | IPerformanceAdsetShort | IExtensionAdsetShort) => {
					requests.push(CampaignsApi.toggleAdsetVisibility({
						campaignType: adset.campaignType,
						slug: adset.slug,
						visible: adset.status !== AdsetStatus.ACTIVE,
					}))
				})

				await Promise.all(requests)
				if (requests.length) {
					await this.fetchActiveCampaignsShort()
					if (this.activeCampaignsFetched) {
						this.fetchActiveCampaigns()
					}
				}
			}
			catch (err) {
				Logger.error('Error updating ssp media campaigns status', true, err)
			}
			finally {
				this.isFetchingActiveCampaigns = false
			}
		},

		async changeSspTextCampaignsStatuses (isActive: boolean) {
			try {
				this.isFetchingActiveCampaigns = true

				const requests: Promise<IResponseMessage>[] = []
				const list = isActive ? this.activeCampaignsShort.data.inactive : this.activeCampaignsShort.data.active
				const campaignStatus = isActive ? AdsetStatus.INACTIVE : AdsetStatus.ACTIVE
				const sspTextAdsets = list.filter((adset: IBrandAwarenessAdsetShort | IPerformanceAdsetShort | IExtensionAdsetShort) => isSspTextFormat(adset.format) && adset.status === campaignStatus)
				sspTextAdsets.forEach((adset: IBrandAwarenessAdsetShort | IPerformanceAdsetShort | IExtensionAdsetShort) => {
					requests.push(CampaignsApi.toggleAdsetVisibility({
						campaignType: adset.campaignType,
						slug: adset.slug,
						visible: adset.status !== AdsetStatus.ACTIVE,
					}))
				})

				await Promise.all(requests)
				if (requests.length) {
					await this.fetchActiveCampaignsShort()
					if (this.activeCampaignsFetched) {
						this.fetchActiveCampaigns()
					}
				}
			}
			catch (err) {
				Logger.error('Error updating ssp text campaigns status', true, err)
			}
			finally {
				this.isFetchingActiveCampaigns = false
			}
		},

		async showCampaignInfoSidebar (adset: IActiveAdset) {
			this.adsetInfoSidebarVisible = true
			if (this.adsetInfo?.slug !== adset.slug) {
				this.adsetInfo = null
				this.fetchAdsetInfo(adset)
			}
		},

		async hideCampaignInfoSidebar () {
			this.adsetInfoSidebarVisible = false
		},

		async fetchBrandAwarenessProductLink (creativeSlug: string) {
			try {
				const res = await CampaignsApi.getBrandAwarenessProductLink(creativeSlug)

				if (res.status) {
					return res.data.url
				}

				return ''
			}
			catch (err) {
				Logger.error('Error fetching brand awareness product link', true, err)
			}
		},

		async fetchPrerollLink (adsetSlug: string) {
			try {
				const res = await CampaignsApi.getPrerollLink(adsetSlug)

				if (res.status) {
					return res.data?.url || ''
				}
			}
			catch (err) {
				Logger.error('Error fetching preroll link', true, err)
			}
		},

		async savePrerollVideo (videoId: number | null, vodVideo: {adsetSlug: string; video: string}) {
			try {
				if (videoId) {
					return CampaignsApi.updatePrerollVideo(videoId, { slug: vodVideo.adsetSlug, video: vodVideo.video })
				}

				return CampaignsApi.createPrerollVideo({ slug: vodVideo.adsetSlug, video: vodVideo.video })
			}
			catch (err) {
				Logger.error('Error saving preroll video', true, err)
			}
		},
	},

	getters: {
		countActiveCampaigns: (state) => {
			const { active, unavailable } = state.activeCampaigns.data

			return active.length + unavailable.length
		},

		activeCampaignsFetched: (state) => {
			return state.activeCampaigns.data.active.length ||
			state.activeCampaigns.data.inactive.length ||
			state.activeCampaigns.data.future.length ||
			state.activeCampaigns.data.unavailable.length
		},

		activeCampaignsShortFetched: (state) => {
			return state.activeCampaignsShort.data.active.length ||
			state.activeCampaignsShort.data.inactive.length ||
			state.activeCampaignsShort.data.future.length ||
			state.activeCampaignsShort.data.unavailable.length
		},
	},
})
