import type {
	CampaignType,
	ICampaignAdvertiser,
	ICampaignAdvertiserResponse,
	ICampaignCategory,
	ICampaignCategoryResponse,
	ICampaignHolding,
	ICampaignHoldingResponse,
} from '@/core/types'

export interface IBrandAwarenessCampaignResponse {
  id: number
  slug: string
  type: CampaignType.BRAND_AWARENESS
  type_edit: boolean
  title: string
  title_alternative: string
  affiliate_network: string | null
  description: string
  category: ICampaignCategoryResponse
  holding: ICampaignHoldingResponse
  advertiser: ICampaignAdvertiserResponse
  start: string
  end: string
  time_zone: number
  impressions: number
  total_impressions: number
  budget: number
  total_budget: number
  avg_cpm: number
  channels: number
  clicks: number
  ctr: number
  reach: number
  published: boolean
  visible: boolean
  product_url_additional_params: Array<Record<string, string>>
  closed: boolean
}

export interface IBrandAwarenessCampaign {
  id: number
  slug: string
  type: CampaignType.BRAND_AWARENESS
  typeEdit: boolean
  title: {
		default: string
		alternative: string
	}
	affiliateNetwork: string | null
  description: string
  category: ICampaignCategory
  holding: ICampaignHolding
  advertiser: ICampaignAdvertiser
	dates: {
		start: string
		end: string
	}
  timeZone: number
  impressions: {
		current: number
		total: number
	}
  budget: {
		current: number
		total: number
	}
  avgCpm: number
  channels: number
  clicks: number
  ctr: number
  reach: number
  published: boolean
  visible: boolean
  productUrlParams: Array<Record<string, string>>
  closed: boolean
}
