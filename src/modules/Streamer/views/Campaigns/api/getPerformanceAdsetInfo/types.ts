import type {
	AdsetStatus,
	CampaignType,
	CurrencyName,
	IAdFormat,
	IAttachments,
	ICampaignAdvertiser,
	ICampaignAdvertiserResponse,
	ICampaignHolding,
	ICampaignHoldingResponse,
	PayoutType,
	Platform,
} from '@/core/types'

export interface IPerformanceAdsetInfoResponse {
	actions: number
	advertiser: ICampaignAdvertiserResponse
	attachments: IAttachments
	bid_cap: number
	bid_cpa: number
	campaign: {
		id: number
		slug: string
		type: CampaignType
		title: string
		description: string
		category: string
		holding: ICampaignHolding
		advertiser: ICampaignAdvertiserResponse
		visible: boolean
	}
	chatbot_text: string
	clicks: number
	creator_payout: number
	creator_payout_currency: CurrencyName
	ctr: number
	currency: CurrencyName
	description: string
	end: string
	estimate_income: number
	format: IAdFormat
	global_target_ctr: number | null
	holding: ICampaignHoldingResponse
	impressions: number
	income: number
	payout_type: string
	payable_type: PayoutType
	platform: Platform
	product_url: string
	slug: string
	ssp_bid_floor: null | number
	ssp_commission: null | number
	start: string
	status: AdsetStatus
	target_ctr: number | null
	title: string
}

export interface IPerformanceAdsetInfo {
	campaignType: CampaignType.PERFORMANCE
	slug: string
	platform: Platform
	title: string
	income: {
		current: number
		estimate: number
	}
	impressions: number
	clicks: number
	actions: number
	ctr: {
		current: number
		target: number | null
		global: number | null
	}
	dates: {
		start: string
		end: string
	}
	creatorPayout: {
		value: number
		currency: CurrencyName
	}
	payoutType: string
	payableType: PayoutType
	bidCap: number
	bidCpa: number
	currency: CurrencyName
	format: IAdFormat
	description: string
	campaign: {
		id: number
		slug: string
		type: CampaignType
		title: string
		description: string
		category: string
		holding: ICampaignHolding
		advertiser: ICampaignAdvertiser
		visible: boolean
	}
	attachments: IAttachments
	productUrl: string
	chatbotText: string
	status: AdsetStatus
	ssp: {
		bidFloor: number | null
		commission: number | null
	}
}
