import { defineStore } from 'pinia'

import { CampaignType } from '@/core/types'
import { handleServerError, parseSlug } from '@/core/helpers'
import * as FormCreativeApi from '@/modules/Partner/views/FormCreative/api'
import {
	type ICreateCreativeModel,
	type ICreative,
	type IUpdateCreativeModel,
} from '@/modules/Partner/views/FormCreative/types'

export interface State {
	creative: ICreative | null
	currentCampaignType: CampaignType
	isFetchingCreative: boolean
	fetchError: boolean
}

enum ApiAction {
	FETCH = 'fetch',
	CREATE = 'create',
	UPDATE = 'update',
}

const methodsApi = {
	[CampaignType.BRAND_AWARENESS]: {
		[ApiAction.FETCH]: FormCreativeApi.getBrandAwarenessCreative,
		[ApiAction.CREATE]: FormCreativeApi.createBrandAwarenessCreative,
		[ApiAction.UPDATE]: FormCreativeApi.updateBrandAwarenessCreative,
	},
	[CampaignType.PERFORMANCE]: {
		[ApiAction.FETCH]: () => {
			throw new Error('Not implemented')
		},
		[ApiAction.CREATE]: () => {
			throw new Error('Not implemented')
		},
		[ApiAction.UPDATE]: () => {
			throw new Error('Not implemented')
		},
	},
	[CampaignType.PREROLL]: {
		[ApiAction.FETCH]: () => {
			throw new Error('Not implemented')
		},
		[ApiAction.CREATE]: () => {
			throw new Error('Not implemented')
		},
		[ApiAction.UPDATE]: () => {
			throw new Error('Not implemented')
		},
	},
	[CampaignType.EXTENSION]: {
		[ApiAction.FETCH]: FormCreativeApi.getExtensionCreative,
		[ApiAction.CREATE]: FormCreativeApi.createExtensionCreative,
		[ApiAction.UPDATE]: FormCreativeApi.updateExtensionCreative,
	},
	[CampaignType.SPECIAL_PROJECT]: {
		[ApiAction.FETCH]: FormCreativeApi.getSpecialProjectCreative,
		[ApiAction.CREATE]: FormCreativeApi.createSpecialProjectCreative,
		[ApiAction.UPDATE]: FormCreativeApi.updateSpecialProjectCreative,
	},
}

export const useFormCreativeStore = defineStore('partner-formcreative', {
	state: (): State => ({
		creative: null,
		currentCampaignType: CampaignType.BRAND_AWARENESS,
		isFetchingCreative: false,
		fetchError: false,
	}),

	actions: {
		async fetchCreative(slug: string) {
			try {
				this.fetchError = false

				if (!slug) {
					throw new Error('Creative slug is required')
				}

				this.isFetchingCreative = true

				const { campaignType } = parseSlug(slug)

				const res = await methodsApi[campaignType][ApiAction.FETCH](slug)

				if (res) {
					this.creative = res
					this.currentCampaignType = res.adset.campaign.type
				}
			}
			catch (error) {
				this.fetchError = true
				handleServerError(error, 'Error fetching creative')
			}
			finally {
				this.isFetchingCreative = false
			}
		},

		async createCreative(model: ICreateCreativeModel) {
			try {
				if (!this.currentCampaignType) {
					throw new Error('Campaign type is required')
				}

				const res = await methodsApi[this.currentCampaignType][ApiAction.CREATE](model as any)

				if (res) {
					this.creative = res
				}
			}
			catch (error) {
				handleServerError(error, 'Error creating creative')
			}
		},

		async updateCreative(model: IUpdateCreativeModel) {
			try {
				if (!this.currentCampaignType) {
					throw new Error('Campaign type is required')
				}

				const res = await methodsApi[this.currentCampaignType][ApiAction.UPDATE](model as any)

				if (res) {
					await this.fetchCreative(model.slug)
				}
			}
			catch (error) {
				handleServerError(error, 'Error updating creative')
			}
		},

		async deleteAttachment(data: { field: string; slug: string }) {
			try {
				const res = await FormCreativeApi.deleteAttachment(this.currentCampaignType, data)

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
				const res = await FormCreativeApi.verifyAttachment(this.currentCampaignType, data as any)

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
