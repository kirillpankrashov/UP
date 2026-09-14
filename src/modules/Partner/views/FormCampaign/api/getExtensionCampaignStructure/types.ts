import type {
	AdFormat,
	CampaignType,
	ICampaignAdvertiser,
	ICampaignAdvertiserResponse,
	ICampaignHolding,
	ICampaignHoldingResponse,
} from '@/core/types'


export interface IExtensionCampaignStructureResponse {
	id: number
	slug: string
	type: CampaignType.EXTENSION
	title: string
	description: string
	category: string
	holding: ICampaignHoldingResponse
	advertiser: ICampaignAdvertiserResponse
	visible: boolean
	ad_sets: Array<{
		id: number
		campaign: {
			id: number
			slug: string
			type: CampaignType.EXTENSION
			title: string
			description: string
			category: string
			holding: ICampaignHoldingResponse
			advertiser: ICampaignAdvertiserResponse
		}
		slug: string
		format: AdFormat
		title: string
		created: string
		published: boolean
		visible: boolean
		ads: Array<{
			id: number
			slug: string
			title: string
			visible: boolean
			created: string
		}>
	}>
}

export interface IExtensionCampaignStructure {
	id: number
	slug: string
	campaignType: CampaignType.EXTENSION
	title: string
	description: string
	category: string
	holding: ICampaignHolding
	advertiser: ICampaignAdvertiser
	visible: boolean
	adSets: Array<{
		id: number
		slug: string
		format: AdFormat
		title: string
		created: string
		published: boolean
		visible: boolean
		ads: Array<{
			id: number
			slug: string
			title: string
			visible: boolean
			created: string
		}>
	}>
}
