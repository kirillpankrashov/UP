import type { IAttachments } from '@/core/types'

export interface ICreativeResponse {
	id: number
	slug: string
	title: string
	attachments: IAttachments
	product_url: string
	chatbot_text: string
}

export interface ICreative {
	id: number
	slug: string
	title: string
	attachments: IAttachments
	productUrl: string
	chatbotText: string
}
