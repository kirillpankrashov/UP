import { AdFormat, PayoutType, Platform, type TCountryId } from '@/core/types'

export interface ICreatePerformanceAdsetData {
	campaignSlug: string
  title: {
		default: string
	}
  description: string
  format: AdFormat
	formatEdit: boolean
  platform: Platform
	dates: {
		start: string | undefined
		end: string | undefined
	}
  externalId: string
  payableType: PayoutType
  bidCap: number | undefined
  bidCpa: number | undefined
  impressions: number | undefined
  budget: number | undefined
  productUrl: {
		general: string
		mobile: string
	}
  chatbotText: string
  visible: boolean
  timeZone: number | undefined
  targetCtr: number | undefined
  targetCpa: number | undefined
  productUrlShort: string
  pixelClicks: string[]
  pixelClicksScripts: string
	targeting: {
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
		streamers: {
			list: number[]
			exclude: boolean
		}
		agencies: number[]
	}
	unit: string
}

export interface ICreatePerformanceAdsetPayload {
  slug: string
  title: string
  description: string
  format: AdFormat
  platform: Platform
	start: string
	end: string
  external_id: string
  payable_type: PayoutType
  bid_cap: number | null
  bid_cpa: number | null
  impressions: number | null
  budget: number | null
  product_url: string
  mobile_product_url: string
  chatbot_text: string | null
  exclude_streamers: boolean
  streamers: number[]
  exclude_countries: boolean
  countries: TCountryId[]
  exclude_countries_auditory: boolean
  countries_auditory: TCountryId[]
  exclude_devices_auditory: boolean
  devices_auditory: string[]
  exclude_languages: boolean
  broadcaster_languages: TCountryId[]
  exclude_tags: boolean
  tags: number[]
  visible: boolean
  time_zone: number | null
  target_ctr: number | null
  target_cpa: number | null
  product_url_short: string
  pixel_clicks: string[]
  pixel_clicks_scripts: string
	unit?: string
}