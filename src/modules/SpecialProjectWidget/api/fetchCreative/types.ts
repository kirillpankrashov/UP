import type { AdFormat, CampaignType, IAttachments } from '@/core/types'

export interface ISpAdSetResponse {
	id: number
	slug: string
	format: AdFormat
	frequency: number | null
	duration: number | null
	make_screenshots: boolean
	campaign: {
		id: number
		slug: string
		type: CampaignType
		ord_markup: string | null
	}
	advertiser: {
		legal_name: string | null
		tin: string | null
	}
}

export interface ISpCreativeResponse {
	id: number
	slug: string
	impression_slug: string | null
	ad_set: ISpAdSetResponse
	attachments: IAttachments
	qr_code: boolean
	companion_cta: string
	qr_link: string
	pixel_impressions: string[]
	viewers_count: number
}

export interface ISpStreamInfo {
	id: string
	viewers: number
	category: string
	title: string
	gender: string
	keywords: string
	domain: string
	page: string
}

export interface ISpFetchResponse {
	status: boolean
	data: {
		stream: ISpStreamInfo
		items: ISpCreativeResponse[]
	} | []
}

export interface ISpCheckResponse {
	status: boolean
}

export interface ISpAdSet {
	id: number
	slug: string
	format: AdFormat
	frequency: number | null
	duration: number | null
	campaign: {
		id: number
		slug: string
		type: CampaignType
		ordMarkup: string
	}
	advertiser: {
		legalName: string | null
		tin: string | null
	}
}

export interface ISpCreative {
	id: number
	slug: string
	impressionSlug: string | null
	viewersCount: number
	qr: {
		code: boolean
		link: string | null
	}
	pixels: {
		impressions: string[]
	}
	adSet: ISpAdSet
	attachments: IAttachments
	stream: ISpStreamInfo
}
