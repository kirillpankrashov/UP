import type {
	CurrencyName,
	DomainName,
	Locale,
	TCPM,
	TCPMResponse,
} from '@/core/types'

export type TPartnerResponse = {
	user: {
		balance: number
		company: string
		currency: CurrencyName
		debug_active: boolean
		domain: DomainName
		email: string
		email_verified: boolean
		locale: Locale
		name: string
		phone: string
		role_extended: boolean
		signed_up: string
		user_hash: string
		user_id: number
		agency: {
			id: number
			title: string
			description: string
			streamers_participate: boolean
			use_dark_market: boolean
			commission: number | null
			ignore_categories: number[]
			cost_per_mille: TCPMResponse
			currency: CurrencyName
		}
	}
}

export type TPartner = {
	balance: number
	company: string
	currency: CurrencyName
	domain: DomainName
	email: string
	emailVerified: boolean
	locale: Locale
	username: string
	phone: string
	roleExtended: boolean
	signedUp: string
	userHash: string
	userId: number
	agency: {
		id: number
		title: string
		description: string
		streamersParticipate: boolean
		useDarkMarket: boolean
		commission: number | null
		ignoreCategories: number[]
		cpm: TCPM
		currency: CurrencyName
	}
	debugActive: boolean
}
