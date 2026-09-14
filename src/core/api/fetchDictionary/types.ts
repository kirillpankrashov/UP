import type {
	AdvertisingPosition,
	CurrencyIcon,
	CurrencyName,
	ICampaignCategory,
	ICampaignPosition,
	ICountry,
	ICurrency,
	IExchangeRate,
	IGender,
	ILanguage,
	ILocale,
	IResponse,
	ITag,
	ITimeZone,
	TCountryId,
	TGenderId,
	TPaymentMinAmount,
	TPlatform,
	TSspTextFrequency,
} from '@/core/types'

export type TDictionaryResponse = IResponse<{
	campaigns_categories: Array<{
		id: number
		title: string
		icon: null | string
		dark_market: boolean
	}>
	campaigns_positions: Array<{
		id: AdvertisingPosition
		title: string
	}>
	countries: Array<{
		id: TCountryId
		title: string
		icon: null
		currency: CurrencyName
	}>
	currencies: Array<{
		id: CurrencyName
		icon: CurrencyIcon
		title: string
	}>
	exchange_rates: Array<{
		from_currency: CurrencyName
		to_currency: CurrencyName
		rate: number
	}>
	gender: Array<{
		id: TGenderId
		title: string
	}>
	languages: Array<{
		id: TCountryId
		title: string
		icon: null | string
	}>
	locales: Array<{
		id: TCountryId
		title: string
		icon: null | string
	}>
	platforms: Record<TPlatform, string>
	tags: Array<{
		id: number
		title: string
		icon: null | string
	}>
	time_zones: Array<{
		id: number
		title: string
	}>
	ssp_text_frequency: Array<{
		value: number
		title: string
	}>
	payment_minimum_amount: Array<{
		currency: CurrencyName
		value: number
	}>
	devices: Array<{
		id: string
		title: string
	}>
	widget_frequency: Array<{
		value: number
		title: string
	}>
}>

export type TDictionary = IResponse<{
	campaignsCategories: ICampaignCategory[]
	campaignsPositions: ICampaignPosition[]
	countries: ICountry[]
	currencies: ICurrency[]
	exchangeRates: IExchangeRate[]
	gender: IGender[]
	languages: ILanguage[]
	locales: ILocale[]
	platforms: Record<TPlatform, string>
	tags: ITag[]
	timeZones: ITimeZone[]
	sspTextFrequency: TSspTextFrequency[]
	minimumPaymentAmount: TPaymentMinAmount[]
	devices: Array<{
		id: string
		title: string
	}>
	widgetFrequencies: Array<{
		value: number
		title: string
	}>
}>
