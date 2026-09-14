import { defineStore } from 'pinia'

import { CampaignType } from '@/core/types'
import { handleServerError, parseSlug } from '@/core/helpers'
import * as FormCampaignApi from '@/modules/Partner/views/FormCampaign/api'
import {
	FormSection,
	type ICampaign,
	type ICampaignStructure,
	type ICreateCampaignModel,
	type IUpdateCampaignModel,
} from '@/modules/Partner/views/FormCampaign/types'

export interface State {
	section: FormSection
	campaign: ICampaign | null
	currentCampaignType: CampaignType
	isFetchingCampaign: boolean
	campaignStructure: ICampaignStructure | null
	isFetchingCampaignStructure: boolean
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
		[ApiAction.FETCH_STRUCTURE]: FormCampaignApi.getBrandAwarenessCampaignStructure,
		[ApiAction.FETCH]: FormCampaignApi.getBrandAwarenessCampaign,
		[ApiAction.CREATE]: FormCampaignApi.createBrandAwarenessCampaign,
		[ApiAction.UPDATE]: FormCampaignApi.updateBrandAwarenessCampaign,
	},
	[CampaignType.PERFORMANCE]: {
		[ApiAction.FETCH_STRUCTURE]: FormCampaignApi.getPerformanceCampaignStructure,
		[ApiAction.FETCH]: FormCampaignApi.getPerformanceCampaign,
		[ApiAction.CREATE]: FormCampaignApi.createPerformanceCampaign,
		[ApiAction.UPDATE]: FormCampaignApi.updatePerformanceCampaign,
	},
	[CampaignType.PREROLL]: {
		[ApiAction.FETCH_STRUCTURE]: FormCampaignApi.getPrerollCampaignStructure,
		[ApiAction.FETCH]: FormCampaignApi.getPrerollCampaign,
		[ApiAction.CREATE]: FormCampaignApi.createPrerollCampaign,
		[ApiAction.UPDATE]: FormCampaignApi.updatePrerollCampaign,
	},
	[CampaignType.EXTENSION]: {
		[ApiAction.FETCH_STRUCTURE]: FormCampaignApi.getExtensionCampaignStructure,
		[ApiAction.FETCH]: FormCampaignApi.getExtensionCampaign,
		[ApiAction.CREATE]: FormCampaignApi.createExtensionCampaign,
		[ApiAction.UPDATE]: FormCampaignApi.updateExtensionCampaign,
	},
	[CampaignType.SPECIAL_PROJECT]: {
		[ApiAction.FETCH_STRUCTURE]: FormCampaignApi.getSpecialProjectCampaignStructure,
		[ApiAction.FETCH]: FormCampaignApi.getSpecialProjectCampaign,
		[ApiAction.CREATE]: FormCampaignApi.createSpecialProjectCampaign,
		[ApiAction.UPDATE]: FormCampaignApi.updateSpecialProjectCampaign,
	},
}

export const useFormCampaignStore = defineStore('partner-formcampaign', {
	state: (): State => ({
		section: FormSection.TYPE,
		campaign: null,
		currentCampaignType: CampaignType.BRAND_AWARENESS,
		isFetchingCampaign: false,
		campaignStructure: null,
		isFetchingCampaignStructure: false,
		fetchError: false,
	}),

	actions: {
		async fetchCampaignStructure(slug: string) {
			try {
				if (!slug) {
					throw new Error('Campaign slug is required')
				}

				this.isFetchingCampaignStructure = true

				const { campaignType } = parseSlug(slug)

				this.campaignStructure = await methodsApi[campaignType][ApiAction.FETCH_STRUCTURE](slug)
			}
			catch (error) {
				this.fetchError = true
				handleServerError(error, 'Error fetching campaign structure')
			}
			finally {
				this.isFetchingCampaignStructure = false
			}
		},

		async fetchCampaign(slug: string) {
			try {
				if (!slug) {
					throw new Error('Campaign slug is required')
				}

				this.isFetchingCampaign = true

				const { campaignType } = parseSlug(slug)

				const res = await methodsApi[campaignType][ApiAction.FETCH](slug)

				if (res) {
					this.campaign = res
					this.currentCampaignType = res.campaignType
				}
			}
			catch (error) {
				this.fetchError = true
				handleServerError(error, 'Error fetching campaign')
			}
			finally {
				this.isFetchingCampaign = false
			}
		},

		async createCampaign(model: ICreateCampaignModel) {
			try {
				if (!this.currentCampaignType) {
					throw new Error('Campaign type is required')
				}

				const res = await methodsApi[this.currentCampaignType][ApiAction.CREATE](model as any)

				if (res) {
					this.campaign = res
					this.currentCampaignType = res.campaignType
				}
			}
			catch (error) {
				handleServerError(error, 'Error creating campaign')
			}
		},

		async updateCampaign(model: IUpdateCampaignModel) {
			try {
				if (!this.currentCampaignType) {
					throw new Error('Campaign type is required')
				}

				const res = await methodsApi[this.currentCampaignType][ApiAction.UPDATE](model as any)

				if (res) {
					this.campaign = res
					this.currentCampaignType = res.campaignType
				}
			}
			catch (error) {
				handleServerError(error, 'Error updating campaign')
			}
		},
	},
})
