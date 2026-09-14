import type {
	CampaignType,
	IAdFormat,
	ICampaignAdvertiser,
	ICampaignAdvertiserResponse,
	ICampaignCategory,
	ICampaignCategoryResponse,
	ICampaignHolding,
	ICampaignHoldingResponse,
	PayoutType,
	Platform,
} from '@/core/types'

export interface IPerformanceAdsetResponse {
  id: number
	format: IAdFormat
	platform: Platform
	campaign: {
		id: number
		slug: string
		type: CampaignType.PERFORMANCE
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
	payable_type: PayoutType
	bid_cap: number
  impressions: number
  total_impressions: number
	bid_cpa: number
  avg_cpm: number
  budget: number
	total_budget: number
  ctr: number
  clicks: number
  channels: number
  published: boolean
  visible: boolean
}

export interface IPerformanceAdset {
  id: number
	format: IAdFormat
	platform: Platform
	campaign: {
		id: number
		slug: string
		type: CampaignType.PERFORMANCE
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
	budget: {
		current: number
		total: number
	}
	payableType: PayoutType
	bidCap: number
	bidCpa: number
	published: boolean
	visible: boolean
}
