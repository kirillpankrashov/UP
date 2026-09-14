import type { AdFormat, PayoutType, Platform, TCountryId } from '@/core/types'

export interface IUpdatePrerollAdsetData {
	slug: string
	title: {
		default: string
		alternative: string | null
	}
  description: string
  format: AdFormat
  platform: Platform
	dates: {
		start: string | undefined
		end: string | undefined
	}
  payableType: PayoutType
  bidCap: number | undefined
  bidCpa: number | undefined
  impressions: number | undefined
  budget: number | undefined
  productUrl: {
		general: string
		mobile: string
	}
  videoDescriptionText: string
  visible: boolean
  targetCtr: number | undefined
  targetCpa: number | undefined
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
		agencies: number[]
		streamers: {
			list: number[]
			exclude: boolean
		}
	}
	unit: string
}

export interface IUpdatePrerollAdsetPayload {
  slug: string
  title: string
  description: string
  format: AdFormat
  platform: Platform
  start: string
  end: string
  payable_type: PayoutType
  bid_cap: number | null
  bid_cpa: number | null
  impressions: number | null
  budget: number | null
  product_url: string
  mobile_product_url: string
  video_description_text: string
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
  target_ctr: number | null
  target_cpa: number | null
  pixel_clicks: string[]
  pixel_clicks_scripts: string
	title_alternative: string | null
	unit?: string
}