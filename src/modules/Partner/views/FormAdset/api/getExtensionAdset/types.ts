import type {
	AdFormat,
	CampaignType,
	ICurrencyDict,
	ICurrencyDictResponse,
	Platform,
	StrategyPayment,
	TCountryId,
} from '@/core/types'
import type { ITargetingAgency, ITargetingStreamer, ITargetingStreamerResponse } from '@/modules/Partner/views/FormAdset/types'

export interface IExtensionAdsetResponse {
	id: number
	format: {
		id: AdFormat
		title: string
		description: string
		icon: string
  }
  format_edit: boolean
  platform: Platform
  campaign: {
    id: number
    slug: string
    type: CampaignType.EXTENSION
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
  impressions: number
  clicks: number | null
  target_ctr: number | null
  targeting: {
    gender: string | null
    age_from: number
    age_to: number
    exclude_streamers: boolean
    exclude_languages: boolean
    exclude_countries: boolean
    exclude_tags: boolean
    exclude_countries_auditory: boolean
    exclude_devices_auditory: boolean
    mature: boolean
    audience_assessment: {
      size: number
      reach: number
      count: number
    }
    streamers: Array<ITargetingStreamerResponse>
    broadcaster_languages: TCountryId[]
    countries: TCountryId[]
    countries_auditory: TCountryId[]
    devices_auditory: string[]
    tags: number[]
    agencies: Array<ITargetingAgency>
	}
	published: boolean
	visible: boolean
	priority: boolean
}

export interface IExtensionAdset {
	id: number
	format: {
		id: AdFormat
		title: string
		description: string
		icon: string
  }
  formatEdit: boolean
  platform: Platform
  campaign: {
    id: number
    slug: string
    type: CampaignType.EXTENSION
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
  bidCap: number
  impressions: number
  clicks: number | null
  targetCtr: number | null
	targeting: {
		gender: string | null
		mature: boolean
		age: {
			from: number
			to: number
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
		agencies: Array<ITargetingAgency>
		streamers: {
			list: Array<ITargetingStreamer>
			exclude: boolean
		}
	}
	published: boolean
	visible: boolean
	priority: boolean
}
