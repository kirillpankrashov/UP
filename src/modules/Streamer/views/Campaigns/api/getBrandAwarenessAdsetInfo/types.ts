import type {
	AdsetStatus,
	CampaignType,
	CurrencyName,
	IAdFormat,
	IAdsetEvr,
	ICampaignAdvertiser,
	ICampaignAdvertiserResponse,
	ICampaignHolding,
	ICampaignHoldingResponse,
	ICreative,
	ICreativeResponse,
	Platform,
	StrategyPayment,
} from '@/core/types'

export interface IBrandAwarenessAdsetInfoResponse {
	ads: ICreativeResponse[]
	advertiser: ICampaignAdvertiserResponse
	bid_cap: number
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
	clicks: number
	creator_payout: number
	creator_payout_currency: CurrencyName
	ctr: number
	currency: CurrencyName
	daily_action_limit: {
		enabled: boolean
		action_price: number
		current: number
		total_earned: number
	}
	description: string
	end: string
	estimate_income: number
	evr: IAdsetEvr[]
	format: IAdFormat
	frequency: string
	global_target_ctr: number | null
	global_target_evr: number | null
	holding: ICampaignHoldingResponse
	impressions_limit: number
	income: number
	median_cpm: number | null
	payout_type: string
	platform: Platform
	slug: string
	ssp_bid_floor: number | null
	ssp_commission: number | null
	start: string
	status: AdsetStatus
	strategy_payment: {
		slug: StrategyPayment
		title: string
	}
	target_ctr: number | null
	target_evr: number | null
	title: string
	total_impressions: number
	start_time: string | null
	finish_time: string | null
	streamer_day_limit: number | null
	streamer_day_limit_shown: number | null
}

export interface IBrandAwarenessAdsetInfo {
	campaignType: CampaignType.BRAND_AWARENESS
	slug: string
	platform: Platform
	title: string
	income: {
		current: number
		estimate: number
	}
	ctr: {
		current: number
		target: number | null
		global: number | null
	}
	impressions: {
		total: number
		limit: number
	}
	clicks: number
	dates: {
		start: string
		end: string
	}
	time: {
		start: string | null
		end: string | null
	}
	creatorPayout: {
		price: number
		currency: CurrencyName
	}
	payoutType: string
	bidCap: number
	currency: CurrencyName
	frequency: string
	format: IAdFormat
	description: string
	ads: ICreative[]
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
	dailyActionLimit: {
		enabled: boolean
		actionPrice: number
		current: number
		totalEarned: number
	}
	status: AdsetStatus
	evr: {
		list: IAdsetEvr[]
		target: number | null
		global: number | null
	}
	ssp: {
		bidFloor: number | null
		commission: number | null
	}
	medianCpm: number | null
	strategyPayment: {
		title: string
		slug: StrategyPayment
	}
	streamerDayLimit: number | null
	streamerDayLimitShown: number | null
}
