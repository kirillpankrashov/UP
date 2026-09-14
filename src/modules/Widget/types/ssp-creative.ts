import type { IStreamInfo } from './stream-info'

export interface ISspCreativeInfo {
  id?: number
  bid_price: number
  chatbot_text: string
  meta_count: string
  pixel_clicks: string[]
  pixel_impressions: string[]
  product_link: string
  rtb_count?: string
  vast_path?: string
  duration?: number | null
  advertiser: string
}

export type ISspCreativeResponse = ISspCreativeInfo

export type ISspStreamInfo = IStreamInfo