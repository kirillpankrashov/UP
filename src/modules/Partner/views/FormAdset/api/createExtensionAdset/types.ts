import type { AdFormat, Platform, StrategyPayment, TCountryId } from '@/core/types'

export interface ICreateExtensionAdsetData {
	campaignSlug: string
	title: {
		default: string
		alternative: string
	}
	description: string
	platform: Platform
	format: AdFormat
	formatEdit: boolean
	strategyPayment: StrategyPayment
	bidCap: number | undefined
	impressions: number | undefined
	targetCtr: number | undefined
	dates: {
		start: string | undefined
		end: string | undefined
	}
	targeting: {
		gender: string | undefined
		mature: boolean
		age: {
			from: number | undefined
			to: number | undefined
		}
		tags: {
			list: number[]
			exclude: boolean
		}
		countries: {
			list: TCountryId[]
			exclude: boolean
		}
		countriesAuditory: {
			list: TCountryId[]
			exclude: boolean
		}
		devicesAuditory: {
			list: string[]
			exclude: boolean
		}
		broadcasterLanguages: {
			list: TCountryId[]
			exclude: boolean
		}
		agencies: number[]
		streamers: {
			list: number[]
			exclude: boolean
		}
	}
}

export interface ICreateExtensionAdsetPayload {
	slug: string
	title: string
	description: string
	platform: Platform
	format: AdFormat
	strategy_payment: StrategyPayment
	bid_cap: number | null
	impressions: number | null
	gender: string | null
	age_from: number | null
	age_to: number | null
	mature: boolean
	tags: number[]
	exclude_tags: boolean
	exclude_countries: boolean
	countries: TCountryId[]
	exclude_countries_auditory: boolean
	countries_auditory: TCountryId[]
	exclude_devices_auditory: boolean
	devices_auditory: string[]
	exclude_languages: boolean
	broadcaster_languages: TCountryId[]
	title_alternative: string | null
	target_ctr: number | null
	agencies: number[]
	streamers: number[]
	exclude_streamers: boolean
	start: string
	end: string
}
