import type {
	CampaignType,
	ICampaignAdvertiser,
	ICampaignAdvertiserResponse,
	ICampaignCategory,
	ICampaignCategoryResponse,
	ICampaignHolding,
	ICampaignHoldingResponse,
} from '@/core/types'

export interface ISpecialProjectCampaignResponse {
  id: number
  slug: string
  type: CampaignType.SPECIAL_PROJECT
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
  budget: number
  impressions: number
  published: boolean
  visible: boolean
  product_url_additional_params: Array<Record<string, string>>
  closed: boolean
}

export interface ISpecialProjectCampaign {
  id: number
  slug: string
  type: CampaignType.SPECIAL_PROJECT
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
  budget: number
  impressions: number
  published: boolean
  visible: boolean
  productUrlParams: Array<Record<string, string>>
  closed: boolean
}
