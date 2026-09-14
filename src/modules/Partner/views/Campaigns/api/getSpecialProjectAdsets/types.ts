import type {
	CampaignType,
	CurrencyName,
	IAdFormat,
	ICampaignCategory,
	ICampaignCategoryResponse,
	ICurrencyDict,
	ICurrencyDictResponse,
	Platform,
	StrategyPayment,
	TCountryId,
} from '@/core/types'

export interface ISpecialProjectAdsetResponse {
  id: number
  format: IAdFormat
  platform: Platform
  campaign: {
    id: number
    slug: string
    type: CampaignType.SPECIAL_PROJECT
    title: string
    description: string
    category: ICampaignCategoryResponse
    visible: boolean
  }
  currency: ICurrencyDictResponse
  slug: string
  title: string
  title_alternative: string
  description: string
  start: string
  end: string
  strategy_payment: StrategyPayment
  bid_cap: number
  targeting: {
    streamers: Array<{id: number, price: number}>
    countries_auditory: TCountryId[]
    devices_auditory: string[]
    exclude_countries_auditory: boolean
    exclude_devices_auditory: boolean
  }
  published: boolean
  visible: boolean
}

export interface ISpecialProjectAdset {
  id: number
	format: IAdFormat
	platform: Platform
	campaign: {
		id: number
		slug: string
		type: CampaignType.SPECIAL_PROJECT
		title: {
			default: string
		}
		description: string
		category: ICampaignCategory
		visible: boolean
	}
  currency: ICurrencyDict
	slug: string
	title: {
		default: string
		alternative: string
	}
	description: string
	dates: {
		start: string
		end: string
	}
  bidCap: number
	published: boolean
	visible: boolean
}
