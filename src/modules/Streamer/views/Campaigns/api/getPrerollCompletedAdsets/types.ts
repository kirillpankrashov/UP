import type { CampaignType, CurrencyName, Platform } from '@/core/types'

export interface IPrerollCompletedAdsetResponse {
	id: number
	slug: string
	title: string
	description: string
	logo: string
	start: string
	end: string
	currency: CurrencyName
	platform: Platform
}

export interface IPrerollCompletedAdset {
	campaignType: CampaignType.PREROLL
	id: number
	slug: string
	title: string
	description: string
	logo: string
	dates: {
		start: string
		end: string
	}
	status: 'close'
	currency: CurrencyName
	platform: Platform
}
