import type {
	CampaignType,
	CurrencyName,
	IAdFormat,
	IAttachments,
	ICampaignAdvertiserResponse,
	ICampaignHoldingResponse,
	PayoutType,
	Platform,
	PrerollAdsetStatus,
} from '@/core/types'

export interface IPrerollAdsetInfoResponse {
	slug: string
	platform: Platform
	title: string
	income: number
	estimate_income: number
	earnings_limit: number
	impressions: number
	clicks: number
	actions: number
	ctr: number
	target_ctr: number
	global_target_ctr: number
	start: string
	end: string
	creator_payout: number
	creator_payout_currency: CurrencyName
	ssp_commission: number | null
	ssp_bid_floor: number | null
	payout_type: string
	payable_type: PayoutType
	bid_cap: number
	bid_cpa: number
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
		visible: boolean
	}
	holding: ICampaignHoldingResponse
	advertiser: ICampaignAdvertiserResponse
	attachments: IAttachments
	product_url: string
	video_description_text: string
	vod: {
		id: number
		video: string
		status: PrerollAdsetStatus
	}[]
	status: PrerollAdsetStatus
}

export interface IPrerollAdsetInfo {
	campaignType: CampaignType.PREROLL
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
		visible: boolean
	}
	attachments: IAttachments
	productUrl: string
	status: PrerollAdsetStatus
	ssp: {
		bidFloor: number | null
		commission: number | null
	}
	videoDescriptionText: string
	vod: {
		id: number
		video: string
		status: PrerollAdsetStatus
	}[]
}
