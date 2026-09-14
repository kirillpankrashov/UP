import type {
	AdFormat,
	CampaignType,
	ICampaignAdvertiser,
	ICampaignAdvertiserResponse,
	ICampaignHolding,
	ICampaignHoldingResponse,
} from '@/core/types'


export interface IPrerollCampaignStructureResponse {
	id: number
	slug: string
	type: CampaignType.PREROLL
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
			type: CampaignType.PREROLL
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
		visible: boolean
	}>
}

export interface IPrerollCampaignStructure {
	id: number
	slug: string
	campaignType: CampaignType.PREROLL
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
		visible: boolean
	}>
}