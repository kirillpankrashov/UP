import type { AdFormat, CampaignType, IAttachments } from '@/core/types'

import type { IAdSetResponse } from './adset'
import type { IStreamInfo } from './stream-info'

export interface IDemoCreativeResponse {
  id: null
  slug: null
  title: null
  description: null
  qr_code: boolean
  qr_link: string | null | false
  product_url: null
  companion_cta: string
  viewers_count: number
  companion_heading: string
  companion_text: string
  chatbot_text: null
  ad_set: {
    id: null
    slug: null
    title: null
    format: string
    format_code: AdFormat
    advertiser: {
      legal_name: string
      tin: string
    }
    make_screenshots: boolean
    campaign?: {
      ord_markup: string
    }
  }
  campaign: {
    id: null
    slug: null
    title: null
    category: null
    description: null
    type: string
    type_code: CampaignType
    ord_markup: string
  }
  attachments: IAttachments
}

export type IPromoCreativeResponse = IDemoCreativeResponse

export interface IRealDemoCreativeResponse {
  id: number
  impression_slug: string
  qr_code: boolean
  qr_link: string
  companion_cta: string
  viewers_count: number
  slug: string
  ad_set: IAdSetResponse
  attachments: IAttachments
}

export interface ICreativeResponse {
  id: number
  slug: string
  impression_slug?: string
  qr_code: boolean
  qr_link: string
  viewers_count: number
  companion_cta: string
  companion_heading: string
  companion_text: string
  pixel_clicks: string[]
  pixel_impressions: string[]
  ad_set: IAdSetResponse
  attachments: IAttachments
}

export interface ICreativesResponse {
  stream: IStreamInfo
  items: ICreativeResponse[]
}
