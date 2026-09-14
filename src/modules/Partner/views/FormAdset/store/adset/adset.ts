import { defineStore } from 'pinia'

import { CampaignType } from '@/core/types'
import { handleServerError, parseSlug } from '@/core/helpers'
import type { IAudience } from '@/modules/Partner/views/FormAdset/api'
import * as FormAdsetApi from '@/modules/Partner/views/FormAdset/api'
import {
	type IAdset,
	type ICreateAdsetModel,
	type IUpdateAdsetModel,
} from '@/modules/Partner/views/FormAdset/types'

export interface State {
	adset: IAdset | null
	currentCampaignType: CampaignType
	isFetchingAdset: boolean
	audience: IAudience | null
	fetchError: boolean
}

enum ApiAction {
	FETCH_STRUCTURE = 'fetchStructure',
	FETCH = 'fetch',
	CREATE = 'create',
	UPDATE = 'update',
}

const methodsApi = {
	[CampaignType.BRAND_AWARENESS]: {
		[ApiAction.FETCH]: FormAdsetApi.getBrandAwarenessAdset,
		[ApiAction.CREATE]: FormAdsetApi.createBrandAwarenessAdset,
		[ApiAction.UPDATE]: FormAdsetApi.updateBrandAwarenessAdset,
	},
	[CampaignType.PERFORMANCE]: {
		[ApiAction.FETCH]: FormAdsetApi.getPerformanceAdset,
		[ApiAction.CREATE]: FormAdsetApi.createPerformanceAdset,
		[ApiAction.UPDATE]: FormAdsetApi.updatePerformanceAdset,
	},
	[CampaignType.PREROLL]: {
		[ApiAction.FETCH]: FormAdsetApi.getPrerollAdset,
		[ApiAction.CREATE]: FormAdsetApi.createPrerollAdset,
		[ApiAction.UPDATE]: FormAdsetApi.updatePrerollAdset,
	},
	[CampaignType.EXTENSION]: {
		[ApiAction.FETCH]: FormAdsetApi.getExtensionAdset,
		[ApiAction.CREATE]: FormAdsetApi.createExtensionAdset,
		[ApiAction.UPDATE]: FormAdsetApi.updateExtensionAdset,
	},
	[CampaignType.SPECIAL_PROJECT]: {
		[ApiAction.FETCH]: FormAdsetApi.getSpecialProjectAdset,
		[ApiAction.CREATE]: FormAdsetApi.createSpecialProjectAdset,
		[ApiAction.UPDATE]: FormAdsetApi.updateSpecialProjectAdset,
	},
}

export const useFormAdsetStore = defineStore('partner-formadset', {
	state: (): State => ({
		adset: null,
		currentCampaignType: CampaignType.BRAND_AWARENESS,
		isFetchingAdset: false,
		audience: null,
		fetchError: false,
	}),

	actions: {
		async fetchAdset(slug: string) {
			try {
				this.fetchError = false

				if (!slug) {
					throw new Error('Adset slug is required')
				}

				this.isFetchingAdset = true

				const { campaignType } = parseSlug(slug)

				const res = await methodsApi[campaignType][ApiAction.FETCH](slug)

				if (res) {
					this.audience = null
					this.adset = res
					this.currentCampaignType = res.campaign.type
				}
			}
			catch (error) {
				this.fetchError = true
				handleServerError(error, 'Error fetching adset')
			}
			finally {
				this.isFetchingAdset = false
			}
		},

		async createAdset(model: ICreateAdsetModel) {
			try {
				if (!this.currentCampaignType) {
					throw new Error('Campaign type is required')
				}

				const res = await methodsApi[this.currentCampaignType][ApiAction.CREATE](model as any)

				if (res) {
					this.adset = res
					this.currentCampaignType = res.campaign.type
				}
			}
			catch (error) {
				handleServerError(error, 'Error creating adset')
			}
		},

		async updateAdset(model: IUpdateAdsetModel) {
			try {
				if (!this.currentCampaignType) {
					throw new Error('Campaign type is required')
				}

				const res = await methodsApi[this.currentCampaignType][ApiAction.UPDATE](model as any)

				if (res) {
					this.adset = res
					this.currentCampaignType = res.campaign.type
				}
			}
			catch (error) {
				handleServerError(error, 'Error updating adset')
			}
		},

		async calculateAudience(model: ICreateAdsetModel) {
			try {
				const res = await FormAdsetApi.calculateAudience(this.currentCampaignType, model)

				if (res) {
					this.audience = res
				}
			}
			catch (error) {
				handleServerError(error, 'Error calculating audience')
			}
		},

		async deleteAttachment(data: { field: string; slug: string }) {
			try {
				const res = await FormAdsetApi.deleteAttachment(this.currentCampaignType, data)

				if (res) {
					return res
				}
			}
			catch (error) {
				handleServerError(error, 'Error deleting attachment')
			}
		},

		async verifyAttachment(data: { format: string; [key: string]: string }) {
			try {
				const res = await FormAdsetApi.verifyAttachment(this.currentCampaignType, data as any)

				if (res) {
					return res
				}
			}
			catch (error) {
				handleServerError(error, 'Error verifying attachment')
			}
		},
	},
})
