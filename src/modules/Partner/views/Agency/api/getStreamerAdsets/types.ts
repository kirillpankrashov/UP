import type { AdsetStatus, IAdFormat } from '@/core/types'

export interface IStreamerAdsetResponse {
  id: number
  title: string
  campaign: {
		id: number
		slug: string
		type: string
		title: string
		description: string
		category: string
		visible: boolean
	}
  format: IAdFormat
  revenue: number
  impressions: number
  total_ctr: number
  today_ctr: number
  status: AdsetStatus
  restore: boolean
  slug: string
}

export interface IStreamerAdset {
  id: number
  title: string
  campaign: {
		id: number
		slug: string
		type: string
		title: string
		description: string
		category: string
		visible: boolean
	}
  format: IAdFormat
  revenue: number
  impressions: number
  totalCtr: number
  todayCtr: number
  status: AdsetStatus
  restore: boolean
  slug: string
}
