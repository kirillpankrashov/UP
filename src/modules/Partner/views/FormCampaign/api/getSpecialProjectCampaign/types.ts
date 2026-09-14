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

export interface ISpecialProjectCampaignResponse {
	id: number
	slug: string
	type: CampaignType.SPECIAL_PROJECT
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

export interface ISpecialProjectCampaign {
	id: number
	slug: string
	campaignType: CampaignType.SPECIAL_PROJECT
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
