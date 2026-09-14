import type { IFormUrlParamItem } from '@/modules/Partner/views/FormCampaign/types'

export interface ICreatePrerollCampaignData {
	title: string
	description: string
	category: number | undefined
	affiliateNetwork: number | undefined
	holding: number | undefined
	start: string | undefined
	end: string | undefined
	advertiser: number | undefined
	productUrlParams: IFormUrlParamItem[]
	mediaAgency: number | undefined
	ordMarkup: string
}

export interface ICreatePrerollCampaignPayload {
	title: string
	description: string
	category: number | null
	affiliate_network: number | null
	holding: number | null
	start: string | null
	end: string | null
	advertiser: number | null
	product_url_additional_params: Record<string, string>
	media_agency: number | null
	ord_markup: string
}
