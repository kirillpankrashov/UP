import type { IFormUrlParamItem } from '@/modules/Partner/views/FormCampaign/types'

export interface ICreateExtensionCampaignData {
	title: string
	description: string
	category: number | undefined
	holding: number | undefined
	advertiser: number | undefined
	end: string | undefined
	start: string | undefined
	productUrlParams: IFormUrlParamItem[]
	mediaAgency: number | undefined
	ordMarkup: string
}

export interface ICreateExtensionCampaignPayload {
	title: string
	description: string
	category: number | null
	holding: number | null
	advertiser: number | null
	end: string | null
	start: string | null
	product_url_additional_params: Record<string, string>
	media_agency: number | null
	ord_markup: string
}
