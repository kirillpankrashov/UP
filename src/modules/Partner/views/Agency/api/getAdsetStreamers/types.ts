import type { CurrencyName } from '@/core/types'

export interface IAdsetStreamerResponse {
  creator_nickname: string
  revenue: number
  currency: CurrencyName
  impressions: number
  average_ctr: number
  daily_ctr: number
  status: string
}

export interface IAdsetStreamer {
  nickname: string
  revenue: number
  currency: CurrencyName
  impressions: number
  averageCtr: number
  dailyCtr: number
  status: string
}
