import type { AdFormat, AdvertisingFrequency, Platform, StrategyPayment, TCountryId } from '@/core/types'

export interface ICreateBrandAwarenessAdsetData {
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
	cpa: number | undefined
	conversions: number | undefined
	cpc: number | undefined
	clicks: number | undefined
	cpaDailyLimit: number | undefined
	cpcDailyLimit: number | undefined
	frequency: AdvertisingFrequency | undefined
	frequencyCount: number | undefined
	frequencyPeriod: string | undefined
  streamerDayLimit: number | undefined
	targetCtr: number | undefined
	targetEvr: number | undefined
	timeZone: number | undefined
	dates: {
		start: string | undefined
		end: string | undefined
	}
	view: null | [Date, Date]
	conversionAlert: {
		animation: string
		text: string
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
	margin: number | undefined
	agencyCommission: number | undefined
	cpmPercent: number | undefined
}

export interface ICreateBrandAwarenessAdsetPayload {
	slug: string
	title: string
	description: string
	platform: Platform
	format: AdFormat
	strategy_payment: StrategyPayment
	bid_cap: number | null
	impressions: number | null
	cpa: number | null
	conversions: number | null
	cpc: number | null
	clicks: number | null
	cpa_daily_limit: number | null
	cpc_daily_limit: number | null
	frequency: AdvertisingFrequency | null
	frequency_count: number | null
	frequency_period: string | null
  streamer_day_limit: number | null
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
	time_zone: number | null
	target_ctr: number | null
	target_evr: number | null
	agencies: number[]
	streamers: number[]
	exclude_streamers: boolean
	start: string
	end: string
	start_view: string | null
	end_view: string | null
	conversions_alert_animation: string
	conversions_alert_text: string
	margin: number | null
	agency_commission: number | null
	cpm_percent: number | null
}
