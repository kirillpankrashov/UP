import type {
	AdFormat,
	AdvertisingFrequency,
	CampaignType,
	ICurrencyDict,
	ICurrencyDictResponse,
	IUnitAttachment,
	Platform,
	StrategyPayment,
	TCountryId,
} from '@/core/types'
import type { ITargetingAgency, ITargetingStreamer, ITargetingStreamerResponse } from '@/modules/Partner/views/FormAdset/types'

export interface IBrandAwarenessAdsetResponse {
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
    type: CampaignType.BRAND_AWARENESS
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
	start_view: string
	end_view: string
  strategy_payment: StrategyPayment
  currency: ICurrencyDictResponse
  bid_cap: number
  impressions: number
  cpa: number | null
  conversions: number | null
  cpc: number | null
  clicks: number | null
  margin: number | null
  agency_commission: number | null
  cpm_percent: number | null
  cpa_day_limit: number | null
  cpc_day_limit: number | null
  time_zone: number | null
  target_ctr: number | null
  target_evr: number | null
  frequency: AdvertisingFrequency | null
  frequency_count: number | null
  frequency_period: string | null
  streamer_day_limit: number | null
  targeting: {
    gender: string | null
    age_from: number
    age_to: number
    min_cpm: number | null
    max_cpm: number | null
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
	conversions_alert_animation: IUnitAttachment | null
	conversions_alert_text: string | null
	published: boolean
	visible: boolean
	priority: boolean
}

export interface IBrandAwarenessAdset {
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
    type: CampaignType.BRAND_AWARENESS
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
	startView: string
	endView: string
  strategyPayment: StrategyPayment
  currency: ICurrencyDict
  bidCap: number | null
  impressions: number | null
  cpa: number | null
  conversions: number | null
  cpc: number | null
  clicks: number | null
  margin: number | null
  agencyCommission: number | null
  cpmPercent: number | null
  cpaDayLimit: number | null
  cpcDayLimit: number | null
  timeZone: number | null
  targetCtr: number | null
  targetEvr: number | null
  frequency: AdvertisingFrequency | null
  frequencyCount: number | null
  frequencyPeriod: string | null
  streamerDayLimit: number | null
	targeting: {
		gender: string | null
		mature: boolean
		cpm: {
			min: number | null
			max: number | null
		}
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
	conversionAlert: {
		animation: IUnitAttachment | null
		text: string | null
	}
	published: boolean
	visible: boolean
	priority: boolean
}
