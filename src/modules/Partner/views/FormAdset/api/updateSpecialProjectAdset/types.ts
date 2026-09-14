import type { AdFormat, Platform, StrategyPayment, TCountryId } from '@/core/types'

export interface IUpdateSpecialProjectAdsetData {
	slug: string
	title: {
		default: string
		alternative: string
	}
	description: string
	platform: Platform
	format: AdFormat
	formatEdit: boolean
	duration: number | undefined
	frequency: number | undefined
	strategyPayment: StrategyPayment
	bidCap: number | undefined
	timeZone: number | undefined
	dates: {
		start: string | undefined
		end: string | undefined
	}
	targeting: {
		countriesAuditory: {
			list: TCountryId[]
			exclude: boolean
		}
		devicesAuditory: {
			list: string[]
			exclude: boolean
		}
		streamers: Array<{id: number, price: number}>
	}
}

export interface IUpdateSpecialProjectAdsetPayload {
	slug: string
	title: string
	description: string
	platform: Platform
	format: AdFormat
	duration: number | null
	frequency: number | null
	strategy_payment: StrategyPayment
	bid_cap: number | null
	exclude_countries_auditory: boolean
	countries_auditory: TCountryId[]
	exclude_devices_auditory: boolean
	devices_auditory: string[]
	title_alternative: string | null
	time_zone: number | null
	streamers: Array<{id: number, price: number}>
	start: string
	end: string
}
