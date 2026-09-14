import { defineStore } from 'pinia'

import { CampaignType } from '@/core/types'
import { Logger, parseSlug } from '@/core/helpers'
import type { IAdset, IAdsetInfo,IAdsetStreamer } from '@/modules/Partner/views/Agency/api'
import * as AgencyApi from '@/modules/Partner/views/Agency/api'

export interface State {
  isFetchingData: boolean
  isFormUpdating: boolean
  adsets:{
		page: number
		perPage: number
		total: number
		data: IAdset[]
	}
  adsetInfo: null | IAdsetInfo
  adsetSidebarVisible: boolean
  adsetSlug: null | string
  campaignType: CampaignType
  adsetTitle: null | string
  adsetStreamers: {
		page: number
		perPage: number
		total: number
		data: null | IAdsetStreamer[]
	}
  adsetStreamersSidebarVisible: boolean
}

export const useAdsetsActiveStore = defineStore('partner-agency-adsets-active', {
	state: (): State => ({
		isFetchingData: false,
		isFormUpdating: false,
		adsets: {
			page: 1,
			perPage: 10,
			total: 0,
			data: [],
		},
		adsetInfo: null,
		adsetSidebarVisible: false,
		adsetSlug: null,
		campaignType: CampaignType.BRAND_AWARENESS,
		adsetTitle: null,
		adsetStreamers: {
			page: 1,
			perPage: 10,
			total: 0,
			data: null,
		},
		adsetStreamersSidebarVisible: false,
	}),

	actions: {
		async getAdsets (page = 1) {
			try {
				this.adsets.data = []
				this.adsets.total = 0
				this.adsets.page = page
				this.adsets.perPage = 10

				this.isFetchingData = true

				const res = await AgencyApi.getAdsetsActive({ page }, this.campaignType)

				this.adsets.data = res.data
				this.adsets.total = res.total
				this.adsets.page = page
				this.adsets.perPage = res.perPage
			}
			finally {
				this.isFetchingData = false
			}
		},

		async getAdsetInfo (slug: string) {
			this.adsetSidebarVisible = true

			if (typeof slug !== 'string') {
				Logger.warning('There is no slug provided')
			}

			if (this.adsetSlug === slug) {
				return
			}

			try {
				this.adsetInfo = null

				this.isFetchingData = true

				this.campaignType = parseSlug(slug)?.campaignType
				this.adsetSlug = slug
				this.adsetTitle = this._getAdsetTitle(slug)

				const res = await AgencyApi.getAdsetInfo(slug, this.campaignType)

				this.adsetInfo = res
			}
			finally {
				this.isFetchingData = false
			}
		},

		async getStreamers (slug: string, page = 1) {
			if (this.adsetStreamersSidebarVisible) {
				return
			}

			if (typeof slug !== 'string') {
				Logger.warning('Campaign if is not of type \'string\'')
			}

			this.adsetStreamers.data = []
			this.adsetStreamers.total = 0
			this.adsetStreamers.page = page
			this.adsetStreamers.perPage = 10

			this.adsetStreamersSidebarVisible = true

			try {
				this.isFetchingData = true

				this.adsetTitle = this._getAdsetTitle(slug)

				const res = await AgencyApi.getAdsetStreamers(slug, page, this.campaignType)

				this.adsetStreamers.data = res.data
				this.adsetStreamers.total = res.total
				this.adsetStreamers.page = page
				this.adsetStreamers.perPage = res.perPage
			}
			finally {
				this.isFetchingData = false
			}
		},

		_getAdsetTitle (slug: string | null) {
			return this.adsets.data.find(adset => adset.slug === slug)?.title || null
		},

		setTypeCompany (type: CampaignType) {
			this.campaignType = type
		},
	},
})
