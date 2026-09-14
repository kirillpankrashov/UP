import type {
	CampaignType,
	ICampaignAdvertiser,
	ICampaignAdvertiserResponse,
	ICampaignCategory,
	ICampaignCategoryResponse,
	ICampaignHolding,
	ICampaignHoldingResponse,
} from '@/core/types'

export interface IPerformanceCampaignResponse {
  id: number
  slug: string
  type: CampaignType.PERFORMANCE
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
	external_id: string
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

export interface IPerformanceCampaign {
  id: number
  slug: string
  type: CampaignType.PERFORMANCE
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
	externalId: string
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
