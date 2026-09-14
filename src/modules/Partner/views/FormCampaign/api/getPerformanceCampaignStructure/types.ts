import type {
	AdFormat,
	CampaignType,
	ICampaignAdvertiser,
	ICampaignAdvertiserResponse,
	ICampaignHolding,
	ICampaignHoldingResponse,
} from '@/core/types'


export interface IPerformanceCampaignStructureResponse {
	id: number
	slug: string
	type: CampaignType.PERFORMANCE
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
			type: CampaignType.PERFORMANCE
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

export interface IPerformanceCampaignStructure {
	id: number
	slug: string
	campaignType: CampaignType.PERFORMANCE
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