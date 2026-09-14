import type {
	AdFormat,
	CampaignType,
	IAttachments,
	ICampaignAdvertiser,
	ICampaignAdvertiserResponse,
	ICampaignHolding,
	ICampaignHoldingResponse,
} from '@/core/types'

export interface IBrandAwarenessCreativeResponse {
  id: number
  ad_set: {
    id: number
    campaign: {
      id: number
      slug: string
      type: CampaignType.BRAND_AWARENESS
      title: string
      description: string
      category: string
      holding: ICampaignHoldingResponse
      advertiser: ICampaignAdvertiserResponse
      visible: boolean
    }
    slug: string
    format: AdFormat
    title: string
    created: string
    published: boolean
    visible: boolean
  }
  slug: string
  title: string
  title_alternative: string
  description: string
  attachments: IAttachments
  product_url: string
  mobile_product_url: string
  chatbot_text: string
  companion_heading: string
  companion_text: string
  companion_cta: string
  qr_code: boolean
  script_code: string
  pixel_clicks: string[]
  pixel_clicks_scripts: string
  pixel_impressions: string[]
  pixel_inspections: string[]
  pixel_quertels_25: string[]
  pixel_quertels_50: string[]
  pixel_quertels_75: string[]
  product_url_additional_params: string[]
  legal_compliance: {
    erid: {
      media: string
      text: string
    }
    marker: {
      media: string
      text: string
    }
  }
  published: boolean
  visible: boolean
}

export interface IBrandAwarenessCreative {
  id: number
  adset: {
    id: number
    campaign: {
      id: number
      slug: string
      type: CampaignType.BRAND_AWARENESS
      title: string
      description: string
      category: string
      holding: ICampaignHolding
      advertiser: ICampaignAdvertiser
      visible: boolean
    }
    slug: string
    format: AdFormat
    title: string
    created: string
    published: boolean
    visible: boolean
  }
  slug: string
  title: string
  titleAlternative: string
  description: string
  attachments: IAttachments
	productUrl: {
		general: string
		mobile: string
	}
  chatbotText: string
	companion: {
		heading: string
		text: string
		cta: string
	}
  qrCode: boolean
  scriptCode: string
  pixelClicks: string[]
  pixelClicksScripts: string
  pixelImpressions: string[]
  pixelInspections: string[]
  pixelQuertels25: string[]
  pixelQuertels50: string[]
  pixelQuertels75: string[]
  productUrlAdditionalParams: string[]
  legalCompliance: {
    erid: {
      media: string
      text: string
    }
    marker: {
      media: string
      text: string
    }
  }
  published: boolean
  visible: boolean
}