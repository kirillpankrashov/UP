import {
	AdFormat,
	CampaignType,
	CurrencyName,
	type IAdFormat,
	Platform,
	StrategyPayment,
	type TCPMFormatsData,
	type TCPMFormatsResponse,
	type TGenderId,
} from '@/core/types'

export interface ICampaignsDictionaryResponse {
	types: Array<{
		id: CampaignType
		title: string
		description: string
		icon: string | null
		visible: boolean
	}>
	platforms: Record<Platform, string>
	formats: Array<IAdFormat>
	frequency?: Array<{
		id: string
		title: string
	}>
	frequency_periods?: Array<{
		id: string
		title: string
	}>
	affiliate_networks?: Array<{
		id: number
		title: string
		currency: {
			code: CurrencyName
			en_title: string
			ru_title: string
			pt_title: string
			es_title: string
			flag: string
			visible: boolean
		}
	}>
	strategy_payment_types: Array<{
		id: StrategyPayment
		title: string
	}>
	gender: Array<{
		id: TGenderId
		title: string
	}>
	holdings: Array<{
		id: number
		title: string
		description: string | null
		logo: string | null
		advertisers: Array<{
			id: number
			title: string
		}>
	}>
	format_requirements: Array<{
		format: AdFormat
		requirements: string[]
	}>
	agencies?: Array<{
		id: number
		title: string
		use_dark_market: boolean
		internal_cpm: {
			min: TCPMFormatsResponse
			max: TCPMFormatsResponse
		}
		external_cpm: {
			min: TCPMFormatsResponse
			max: TCPMFormatsResponse
		}
		currency: CurrencyName
	}>
	agencies_payable_cpm?: TCPMFormatsResponse
	agencies_payable_cpc?: number
	agencies_payable_cpa?: number
	media_agencies: Array<{
		id: number
		title: string
	}>
}

export interface ICampaignsDictionary {
	types: Array<{
		id: CampaignType
		title: string
		description: string
		icon: string | null
		visible: boolean
	}>
	platforms: Record<Platform, string>
	formats: Array<IAdFormat>
	frequency: Array<{
		id: string
		title: string
	}>
	frequencyPeriods: Array<{
		id: string
		title: string
	}>
	affiliateNetworks: Array<{
		id: number
		title: string
		currency: {
			code: CurrencyName
			enTitle: string
			ruTitle: string
			ptTitle: string
			esTitle: string
			flag: string
			visible: boolean
		}
	}>
	strategyPaymentTypes: Array<{
		id: StrategyPayment
		title: string
	}>
	gender: Array<{
		id: TGenderId
		title: string
	}>
	holdings: Array<{
		id: number
		title: string
		description: string
		logo: string
		advertisers: Array<{
			id: number
			title: string
		}>
	}>
	formatRequirements: Array<{
		format: AdFormat
		requirements: string[]
	}>
	agencies?: Array<{
		id: number
		title: string
		useDarkMarket: boolean
		internalCpm: {
			min: TCPMFormatsData
			max: TCPMFormatsData
		}
		externalCpm: {
			min: TCPMFormatsData
			max: TCPMFormatsData
		}
		currency: CurrencyName
	}>
	agenciesPayableCpm?: TCPMFormatsData | null
	agenciesPayableCpc?: number | null
	agenciesPayableCpa?: number | null
	mediaAgencies: Array<{
		id: number
		title: string
	}>
}
