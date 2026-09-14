import type { IFormUrlParamItem } from '@/modules/Partner/views/FormCampaign/types'

export interface ICreateBrandAwarenessCampaignData {
	title: string
	description: string
	category: number | undefined
	affiliateNetwork: number | undefined
	holding: number | undefined
	advertiser: number | undefined
	end: string | undefined
	start: string | undefined
	timezone: number | undefined
	productUrlParams: IFormUrlParamItem[]
	mediaAgency: number | undefined
	ordMarkup: string
}

export interface ICreateBrandAwarenessCampaignPayload {
	title: string
	description: string
	category: number | null
	affiliate_network: number | null
	holding: number | null
	advertiser: number | null
	end: string | null
	start: string | null
	time_zone: number | null
	product_url_additional_params: Record<string, string>
	media_agency: number | null
	ord_markup: string
}
