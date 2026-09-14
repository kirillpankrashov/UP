import type {
	CampaignType,
	IAdFormat,
	ICampaignAdvertiser,
	ICampaignAdvertiserResponse,
	ICampaignCategory,
	ICampaignCategoryResponse,
	ICampaignHolding,
	ICampaignHoldingResponse,
	Platform,
} from '@/core/types'

export interface ISpecialProjectCreativeResponse {
  id: number
  slug: string
  title: string
  title_alternative: string
  description: string
	ad_set: {
		id: number
		format: IAdFormat
		platform: Platform
		campaign: {
			id: number
			slug: string
			type: CampaignType.SPECIAL_PROJECT
			title: string
			description: string
			category: ICampaignCategoryResponse
			holding: ICampaignHoldingResponse
			advertiser: ICampaignAdvertiserResponse
			visible: boolean
		}
		slug: string
		title: string
		description: string
		start: string
		end: string
		published: boolean
		visible: boolean
	}
  published: boolean
  visible: boolean
}

export interface ISpecialProjectCreative {
  id: number
	slug: string
	title: {
		default: string
		alternative: string
	}
	description: string
	adSet: {
		id: number
		format: IAdFormat
		platform: Platform
		campaign: {
			id: number
			slug: string
			type: CampaignType.SPECIAL_PROJECT
			title: {
				default: string
			}
			description: string
			category: ICampaignCategory
			holding: ICampaignHolding
			advertiser: ICampaignAdvertiser
			visible: boolean
		}
		slug: string
		title: string
		description: string
		dates: {
			start: string
			end: string
		}
		published: boolean
		visible: boolean
	}
	published: boolean
	visible: boolean
}
