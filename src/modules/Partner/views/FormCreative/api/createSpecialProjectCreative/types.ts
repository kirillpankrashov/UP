export interface ICreateSpecialProjectCreativeData {
	adsetSlug: string
  chatbotText: string
  title: {
		default: string
	}
	companion: {
		heading: string
		text: string
		cta: string
	}
  productUrl: {
		general: string
		mobile: string
	}
	qrCode: boolean
  pixelClicks: string[]
	pixelImpressions: string[]
	pixelInspections: string[]
  pixelClicksScripts: string
	scriptCode: string
	video: string
	unit: string
	zip: string
}

export interface ICreateSpecialProjectCreativePayload {
  slug: string
  chatbot_text: string | null
  title: string
	companion_cta: string
	companion_heading: string
	companion_text: string
  mobile_product_url: string
  product_url: string
	qr_code: boolean
	pixel_clicks: string[]
	pixel_impressions: string[]
	pixel_inspections: string[]
  pixel_clicks_scripts: string
	script_code: string
	video?: string
	unit?: string
	zip?: string
}
