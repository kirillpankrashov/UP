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

export interface IPrerollCampaignResponse {
	id: number
	slug: string
	type: CampaignType.PREROLL
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
	impressions: number
	total_impressions: number
	budget: number
	total_budget: number
	avg_cpm: number
	channels: number
	clicks: number
	ctr: number
	reach: number
	product_url_additional_params: Record<string, string>
	published: boolean
	visible: boolean
	closed: boolean
	media_agency: {
		id: number
		title: string
	} | null
	ord_markup: string
}

export interface IPrerollCampaign {
	id: number
	slug: string
	campaignType: CampaignType.PREROLL
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
	productUrlParams: IFormUrlParamItem[]
	published: boolean
	visible: boolean
	closed: boolean
	mediaAgency: {
		id: number
		title: string
	} | null
	ordMarkup: string
}
