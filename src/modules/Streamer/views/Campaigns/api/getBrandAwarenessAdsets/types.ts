import type {
	AdsetBlockReason,
	AdsetStatus,
	CampaignType,
	CurrencyName,
	IAdFormat,
	Platform,
	StrategyPayment,
} from '@/core/types'

export interface IBrandAwarenessAdsetResponse {
	id: number
	slug: string
	title: string
	format: IAdFormat
	platform: Platform
	description: string
	logo: string
	impressions: number
	daily_limit: number
	daily_limit_rest: number
	rest_limit_percent: number
	estimate_income: number
	creator_payout_currency: CurrencyName
	currency: CurrencyName
	ctr: number
	start: string
	end: string
	status: AdsetStatus
	restore: boolean
	blocked_at: string | null
	blocked_until: string | null
	blocked_reason: AdsetBlockReason | null
	daily_action_limit: {
		enabled: boolean
		today: number
		today_limit: number
	}
	strategy_payment: StrategyPayment
  start_time: string | null
  finish_time: string | null
  streamer_day_limit: number | null
  streamer_day_limit_shown: number | null
}

export interface IBrandAwarenessAdsetsResponse {
	active: IBrandAwarenessAdsetResponse[]
	inactive: IBrandAwarenessAdsetResponse[]
	future: IBrandAwarenessAdsetResponse[]
	unavailable: IBrandAwarenessAdsetResponse[]
}

export interface IBrandAwarenessAdset {
	campaignType: CampaignType.BRAND_AWARENESS
	id: number
	slug: string
	title: string
	format: IAdFormat
	platform: Platform
	description: string
	logo: string
	impressions: {
		current: number
		dailyLimit: number
		dailyLimitRest: number
	}
	restLimitPercent: number
	estimateIncome: number
	currency: {
		creator: CurrencyName
		adset: CurrencyName
	}
	ctr: number
	dates: {
		start: string
		end: string
	}
	time: {
		start: string | null
		end: string | null
	}
	status: AdsetStatus
	restore: boolean
	blocked: {
		at: string | null
		until: string | null
		reason: AdsetBlockReason | null
	}
	dailyActionLimit: {
		enabled: boolean
		today: number
		limit: number
	}
	strategyPayment: StrategyPayment
	streamerDayLimit: number | null
	streamerDayLimitShown: number | null
}

export interface IBrandAwarenessAdsets {
	active: IBrandAwarenessAdset[]
	inactive: IBrandAwarenessAdset[]
	future: IBrandAwarenessAdset[]
	unavailable: IBrandAwarenessAdset[]
}
