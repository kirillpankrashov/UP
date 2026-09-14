import type {
	CampaignType,
	IAdFormat,
	ICampaignAdvertiser,
	ICampaignAdvertiserResponse,
	ICampaignCategory,
	ICampaignCategoryResponse,
	ICampaignHolding,
	ICampaignHoldingResponse,
	Platform,
} from '@/core/types'

export interface IBrandAwarenessAdsetResponse {
  id: number
	format: IAdFormat
	platform: Platform
	campaign: {
		id: number
		slug: string
		type: CampaignType.BRAND_AWARENESS
		title: string
		description: string
		category: ICampaignCategoryResponse
		holding: ICampaignHoldingResponse
		advertiser: ICampaignAdvertiserResponse
		visible: boolean
	}
  slug: string
  title: string
  description: string
  start: string
  end: string
  impressions: number
  total_impressions: number
  avg_cpm: number
  channels: number
  clicks: number
  ctr: number
  reach: number
	spent: number
  budget: number
  published: boolean
  visible: boolean
}

export interface IBrandAwarenessAdset {
  id: number
	format: IAdFormat
	platform: Platform
	campaign: {
		id: number
		slug: string
		type: CampaignType.BRAND_AWARENESS
		title: {
			default: string
		}
		description: string
		category: ICampaignCategory
		holding: ICampaignHolding
		advertiser: ICampaignAdvertiser
		visible: boolean
	}
	slug: string
	title: {
		default: string
	}
	description: string
	dates: {
		start: string
		end: string
	}
	impressions: {
		current: number
		total: number
	}
	avgCpm: number
	channels: number
	clicks: number
	ctr: number
	reach: number
	budget: {
		current: number
		total: number
	}
	published: boolean
	visible: boolean
}
