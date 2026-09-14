import type {
	AdFormat,
	CampaignType,
	IAttachments,
	ICampaignAdvertiser,
	ICampaignAdvertiserResponse,
	ICampaignCategory,
	ICampaignCategoryResponse,
	ICampaignHolding,
	ICampaignHoldingResponse,
	ICurrencyDict,
	ICurrencyDictResponse,
	PayoutType,
	Platform,
	TCountryId,
} from '@/core/types'
import type { ITargetingStreamer, ITargetingStreamerResponse } from '@/modules/Partner/views/FormAdset/types'

export interface IPrerollAdsetResponse {
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
    type: CampaignType.PREROLL
    title: string
    description: string
		category: ICampaignCategoryResponse
		holding: ICampaignHoldingResponse
		advertiser: ICampaignAdvertiserResponse
    start: string
    end: string
    published: boolean
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
  payable_type: PayoutType
  currency: ICurrencyDictResponse
  bid_cap: number
  impressions: number
  bid_cpa: number
  budget: number
  target_cpa: number | null
  target_ctr: number | null
  product_url: string
  mobile_product_url: string
  pixel_clicks: string[]
  pixel_clicks_scripts: string
  attachments: IAttachments
  targeting: {
    exclude_streamers: boolean
    exclude_countries: boolean
    exclude_languages: boolean
    exclude_tags: boolean
    exclude_countries_auditory: boolean
    exclude_devices_auditory: boolean
    audience_assessment: {
      size: number
      reach: number
      count: number
    }
    streamers: ITargetingStreamerResponse[]
    broadcaster_languages: TCountryId[]
    countries: TCountryId[]
    tags: number[]
    countries_auditory: TCountryId[]
    devices_auditory: string[]
  }
  legal_compliance: {
    erid: {
      media: string | null
      text: null
    }
    marker: {
      media: null
      text: null
    }
  }
  published: boolean
  visible: boolean
	video_description_text: string
}

export interface IPrerollAdset {
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
    type: CampaignType.PREROLL
    title: string
    description: string
		category: ICampaignCategory
		holding: ICampaignHolding
		advertiser: ICampaignAdvertiser
    start: string
    end: string
    published: boolean
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
  payableType: PayoutType
  currency: ICurrencyDict
  bidCap: number
  impressions: number
  bidCpa: number
  budget: number
  targetCpa: number | null
  targetCtr: number | null
  productUrl: string
  mobileProductUrl: string
  pixelClicks: string[]
  pixelClicksScripts: string
  attachments: IAttachments
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
			list: Array<ITargetingStreamer>
			exclude: boolean
		}
	}
  legalCompliance: {
    erid: {
      media: string | null
      text: string | null
    }
    marker: {
      media: string | null
      text: string | null
    }
  }
  published: boolean
  visible: boolean
	videoDescriptionText: string
}