import type { CampaignType, CurrencyName, IAdFormat, IAttachments, Platform } from '@/core/types'

export interface IAdsetInfoResponse {
  slug: string
  platform: Platform
  title: string
  start: string
  end: string
  bid_cap: number
  currency: CurrencyName
  frequency: string
  format: IAdFormat
  description: string
  payout_type: string
  cpa_payout_type: string
  campaign: {
    id: number
    slug: string
    type: CampaignType
    title: string
    description: string
    category: string
    visible: boolean
  }
  ads: Array<{
		id: number
		slug: string
		title: string
		attachments: IAttachments
		product_url: string
		chatbot_text: string
	}>
  daily_action_limit: {
    enabled: boolean
    action_price: number
  }
}

export interface IAdsetInfo {
  slug: string
	campaignType: CampaignType
  platform: Platform
  title: string
	dates: {
		start: string
		end: string
	}
  bidCap: number
  currency: CurrencyName
  frequency: string
  format: IAdFormat
  description: string
  payoutType: string
  cpaPayoutType: string
  campaign: {
    id: number
    slug: string
    type: CampaignType
    title: string
    description: string
    category: string
    visible: boolean
  }
  ads: Array<{
		id: number
		slug: string
		title: string
		attachments: IAttachments
		productUrl: string
		chatbotText: string
	}>
  dailyActionLimit: {
    enabled: boolean
    actionPrice: number
  }
}
