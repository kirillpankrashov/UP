import type {
	AdFormat,
	CampaignType,
	ICurrencyDict,
	ICurrencyDictResponse,
	Platform,
	StrategyPayment,
	TCountryId,
} from '@/core/types'

export interface ISpecialProjectAdsetResponse {
	id: number
	format: {
		id: AdFormat
		title: string
		description: string
		icon: string
  }
  duration: number
  frequency: number
  format_edit: boolean
  platform: Platform
  campaign: {
    id: number
    slug: string
    type: CampaignType.SPECIAL_PROJECT
    title: string
    description: string
    category: string
    visible: boolean
  }
  slug: string
  title: string
  title_alternative: string | null
  description: string
  start: string
  end: string
  strategy_payment: StrategyPayment
  currency: ICurrencyDictResponse
  bid_cap: number
  time_zone: number | null
  targeting: {
    exclude_countries_auditory: boolean
    exclude_devices_auditory: boolean
    streamers: Array<{id: number, price: number}>
    countries_auditory: TCountryId[]
    devices_auditory: string[]
	}
	published: boolean
	visible: boolean
	priority: boolean
}

export interface ISpecialProjectAdset {
	id: number
	format: {
		id: AdFormat
		title: string
		description: string
		icon: string
  }
  duration: number
  frequency: number
  formatEdit: boolean
  platform: Platform
  campaign: {
    id: number
    slug: string
    type: CampaignType.SPECIAL_PROJECT
    title: string
    description: string
    category: string
    visible: boolean
  }
  slug: string
  title: string
  titleAlternative: string | null
  description: string
  start: string
  end: string
  strategyPayment: StrategyPayment
  currency: ICurrencyDict
  bidCap: number | null
  timeZone: number | null
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
	published: boolean
	visible: boolean
	priority: boolean
}
