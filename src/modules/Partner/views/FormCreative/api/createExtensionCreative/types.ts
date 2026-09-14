import type { IGallery, IPanel, IQuiz, IQuizResponse } from '@/core/types'

export interface ICreateExtensionCreativeData {
	adsetSlug: string
  title: {
		default: string
	}
  productUrl: {
		general: string
		mobile: string
	}
  pixelClicks: string[]
	pixelImpressions: string[]
	pixelInspections: string[]
  pixelClicksScripts: string
  preview: string
	scriptCode: string
	quiz: IQuiz | undefined
  panel: IPanel | undefined
	gallery: IGallery | undefined
}

export interface ICreateExtensionCreativePayload {
  slug: string
  title: string
  mobile_product_url: string
  product_url: string
	pixel_clicks: string[]
	pixel_impressions: string[]
	pixel_inspections: string[]
  pixel_clicks_scripts: string
	script_code: string
	preview?: string
	quiz?: IQuizResponse
	panel?: IPanel
	gallery?: IGallery
}
