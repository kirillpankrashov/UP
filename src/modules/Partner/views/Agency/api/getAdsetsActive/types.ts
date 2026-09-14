import type { CampaignType, IAdFormat } from '@/core/types'

export interface IAdsetResponse {
	id: number
  slug: string
  title: string
  description: string
	campaign: {
    id: number
    slug: string
    type: CampaignType
    title: string
    description: string
    category: string
    visible: boolean
  }
  start: string
  end: string
  total_impressions: number
  streamers?: number
  published: boolean
  visible: boolean
  logo: string | null
	format: IAdFormat
  daily_action_limit?: {
    enabled: boolean
    today: number
    today_limit: number
  }
}

export interface IAdset {
	id: number
  slug: string
  title: string
  description: string
	campaignType: CampaignType
  campaign: {
    id: number
    slug: string
    type: CampaignType
    title: string
    description: string
    category: string
    visible: boolean
  }
	dates: {
		start: string
		end: string
	}
	impressions: {
		total: number
	}
  streamers: number | null
  published: boolean
  visible: boolean
  logo: string
  format: IAdFormat
  dailyActionLimit?: {
    enabled: boolean
    today: number
    limit: number
  }
	status: 'active' | 'closed'
}
