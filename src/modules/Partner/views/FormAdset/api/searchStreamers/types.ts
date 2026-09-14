import { AdFormat, CurrencyName, DomainName, Platform, type TCPM, type TCPMResponse } from '@/core/types'
import type { ITargetingAgency } from '@/modules/Partner/views/FormAdset/types'

export interface ITargetingStreamerSearchData {
	query: string
	format?: AdFormat
	minCpm?: number
	maxCpm?: number
	agencies?: number[]
	darkMarket?: boolean
	category?: number | null
}

export interface ITargetingStreamerSearchResponse {
	id: number
	name: string
	email: string
	domain: DomainName
	currency?: CurrencyName
	agency?: ITargetingAgency & {
		use_dark_market_cpm: boolean
		cpm: TCPMResponse | null
	} | null
	cpm?: TCPMResponse | null
	[Platform.TWITCH]: {
		avatar: string
		nickname: string
		displayname: string
	} | null
	[Platform.YOUTUBE]: {
		avatar: string
		nickname: string
		displayname: string
	} | null
	[Platform.TROVO]: {
		avatar: string
		nickname: string
		displayname: string
	} | null
	[Platform.VK_PLAY]: {
		avatar: string
		nickname: string
		displayname: string
	} | null
	[Platform.TIKTOK]: {
		avatar: string
		nickname: string
		displayname: string
	} | null
	widget?: {
		slug: string
	}
}

export interface ITargetingStreamerSearchPayload {
	q: string
	a: number[]
	format?: AdFormat
	min_cpm?: number
	max_cpm?: number
	dark_market?: 1 | 0
	category: number | null
}

export interface ITargetingStreamerSearch {
	id: number
	name: string
	currency: CurrencyName | null
	agency: ITargetingAgency & {
		useDarkMarketCpm: boolean
		cpm: TCPM | null
	} | null
	cpm: TCPM | null
	platform: {
		name: Platform
		avatar: string
		nickname: string
		displayname: string
	}
	widget: {
		slug: string
	} | null
}
