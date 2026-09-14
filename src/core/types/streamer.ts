import type {
	CurrencyName,
	DomainName,
	Locale,
	TCountryId,
	TCPMFormatsData,
	TCPMFormatsResponse,
	TGenderId,
	TPlatformInfoData,
	TPlatformInfoResponse,
	TStreamerTier,
} from '@/core/types'

export type TStreamerResponse = {
	user: {
		user_id: number
		name: string
		email: string
		locale: Locale
		language: Locale
		country: TCountryId
		gender: TGenderId
		balance: number
		currency: CurrencyName
		birthday: number
		referral: number
		email_verified: boolean
		signed_up: string
		user_hash: string
		domain: DomainName
		agency: {
			id: number
			title: string
			description: string
			streamers_participate: boolean
			use_dark_market: boolean
			commission: number | number
			ignore_categories: number[]
			cost_per_mille: {
				internal_cpa: number | null
				internal_cpc: number | null
				internal_cpm: TCPMFormatsResponse | null
				external_cpa: number | null
				external_cpc: number | null
				external_cpm: TCPMFormatsResponse | null
				dark_market_internal_cpa: number | null
				dark_market_internal_cpc: number | null
				dark_market_internal_cpm: TCPMFormatsResponse | null
				dark_market_external_cpa: number | null
				dark_market_external_cpc: number | null
				dark_market_external_cpm: TCPMFormatsResponse | null
			}
			currency: CurrencyName
		}
		debug_active: boolean
		freemium_active: boolean
		deleted_request: boolean
		deleted_left_days: null | number
		deleted: boolean
		youtube_text_active: boolean
		vod_active: boolean
    special_projects_active: boolean
	}
	tier: {
		name: TStreamerTier
	}
	twitch: TPlatformInfoResponse
	youtube: TPlatformInfoResponse
	trovo: TPlatformInfoResponse
	vkplay: TPlatformInfoResponse
	tiktok: TPlatformInfoResponse
	discord: TPlatformInfoResponse
}

export type TStreamer = {
	userId: number
	name: string
	email: string
	locale: Locale
	language: Locale
	country: TCountryId
	gender: TGenderId
	balance: number
	currency: CurrencyName
	birthday: number
	referral: number
	emailVerified: boolean
	signedUp: string
	userHash: string
	domain: DomainName
	agency: {
		id: number
		title: string
		description: string
		streamersParticipate: boolean
		useDarkMarket: boolean
		commission: number | number
		ignoreCategories: number[]
		cpm: {
			internalCpa: number | null
			internalCpc: number | null
			internalCpm: TCPMFormatsData
			externalCpa: number | null
			externalCpc: number | null
			externalCpm: TCPMFormatsData
			darkMarketInternalCpa: number | null
			darkMarketInternalCpc: number | null
			darkMarketInternalCpm: TCPMFormatsData
			darkMarketExternalCpa: number | null
			darkMarketExternalCpc: number | null
			darkMarketExternalCpm: TCPMFormatsData
		}
		currency: CurrencyName
	}
	debugActive: boolean
	freemiumActive: boolean
	deleted: {
		isDeleted: boolean
		isRequested: boolean
		daysLeft: null | number
	}
	loyaltyProgram: {
		level: TStreamerTier
	}
	platforms: {
		twitch: TPlatformInfoData
		youtube: TPlatformInfoData
		trovo: TPlatformInfoData
		discord: TPlatformInfoData
		vkplay?: TPlatformInfoData
		tiktok?: TPlatformInfoData
	}
	isFilled: boolean
	username: string
	youtubeTextActive: boolean
	prerollActive: boolean
	specialProjectsActive: boolean
}
