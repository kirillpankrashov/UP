import type {
	AdFormat,
	CampaignType,
	ICampaignAdvertiser,
	ICampaignAdvertiserResponse,
	ICampaignHolding,
	ICampaignHoldingResponse,
} from '@/core/types'


export interface ISpecialProjectCampaignStructureResponse {
	id: number
	slug: string
	type: CampaignType.SPECIAL_PROJECT
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
			type: CampaignType.SPECIAL_PROJECT
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

export interface ISpecialProjectCampaignStructure {
	id: number
	slug: string
	campaignType: CampaignType.SPECIAL_PROJECT
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
