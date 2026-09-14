import type {
	AdsetStatus,
	CampaignType,
	CurrencyName,
	IAdFormat,
	IUnitAttachment,
	Platform,
	StrategyPayment,
} from '@/core/types'

export interface ISpecialProjectAdsetInfoAdResponse {
	id: number
	slug: string
	title: string
	attachments: {
		video: string | null
		unit: string | null
		zip: IUnitAttachment | null
	}
	product_url: string
	chatbot_text: string
}

export interface ISpecialProjectAdsetInfoResponse {
	slug: string
	title: string
	description: string | null
	platform: Platform
	format: IAdFormat
	impressions: number
	clicks: number
	start: string | null
	end: string | null
	strategy_payment: {
		slug: StrategyPayment
		title: string
	}
	payout_type: string
	currency: CurrencyName
	frequency: number | null
	duration: number | null
	widget_url: string
	ads: ISpecialProjectAdsetInfoAdResponse[]
	status: AdsetStatus
}

export interface ISpecialProjectAdsetInfoAd {
	id: number
	slug: string
	title: string
	attachments: {
		video: string | null
		unit: string | null
		zip: IUnitAttachment | null
	}
	productUrl: string
	chatbotText: string
}

export interface ISpecialProjectAdsetInfo {
	campaignType: CampaignType.SPECIAL_PROJECT
	slug: string
	title: string
	description: string | null
	platform: Platform
	format: IAdFormat
	impressions: number
	clicks: number
	dates: {
		start: string | null
		end: string | null
	}
	strategyPayment: {
		slug: StrategyPayment
		title: string
	}
	payoutType: string
	currency: CurrencyName
	frequency: number | null
	duration: number | null
	widgetUrl: string
	ads: ISpecialProjectAdsetInfoAd[]
	status: AdsetStatus
}
