import type { CurrencyName, Platform, TCPM, TCPMResponse } from '@/core/types'

import type { ITargetingAgency } from './targeting-agency'

export interface ITargetingStreamerResponse {
	id: number
	name: string
	currency?: CurrencyName
	agency?: ITargetingAgency & {
		use_dark_market_cpm: boolean
		cpm: TCPMResponse | null
	} | null
	cpm?: TCPMResponse | null
}

export interface ITargetingStreamer {
	id: number
	name: string
	currency: CurrencyName | null
	agency: ITargetingAgency & {
		useDarkMarketCpm: boolean
		cpm: TCPM | null
	} | null
	cpm: TCPM | null
	platform?: {
		name: Platform
    avatar: string
    nickname: string
    displayname: string
	}
}