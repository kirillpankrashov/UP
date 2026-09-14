import { Platform } from '@/core/types'

export interface IStreamInfo {
  id: number
  viewers: number
  category: string
  title: string
  keywords: string
  gender: string
  bidfloor: number
  bid_cap: number
  domain: string
  page: string
  platform: Platform
  debug?: boolean
  skip_token?: number
  allow_adult_content: boolean
  impression_slug?: string
}