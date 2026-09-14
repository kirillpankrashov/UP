import type {
	CampaignType,
	ICampaignAdvertiser,
	ICampaignAdvertiserResponse,
	ICampaignAffiliateNetworkResponse,
	ICampaignCategory,
	ICampaignCategoryResponse,
	ICampaignHolding,
	ICampaignHoldingResponse,
} from '@/core/types'
import type { IFormUrlParamItem } from '@/modules/Partner/views/FormCampaign/types'

export interface IBrandAwarenessCampaignResponse {
	id: number
	slug: string
	type: CampaignType.BRAND_AWARENESS
	type_edit: boolean
	title: string
	title_alternative: string
	description: string
	affiliate_network: ICampaignAffiliateNetworkResponse | null
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
	evr: []
	reach: number
	published: boolean
	visible: boolean
	product_url_additional_params: Record<string, string>
	closed: boolean
	media_agency: {
		id: number
		title: string
	} | null
	ord_markup: string
}

export interface IBrandAwarenessCampaign {
	id: number
	slug: string
	campaignType: CampaignType.BRAND_AWARENESS
	typeEdit: boolean
	title: {
		default: string
		alternative: string
	}
	description: string
	affiliateNetwork: number | null
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
	evr: []
	reach: number
	published: boolean
	visible: boolean
	productUrlParams: IFormUrlParamItem[]
	closed: boolean
	mediaAgency: {
		id: number
		title: string
	} | null
	ordMarkup: string
}
