import type { AdFormat, CampaignType, IAttachments } from '@/core/types'

import type { IAdSet } from './adset'
import type { IStreamInfo } from './stream-info'

export interface ICreative {
  id: number
  uuid: string
  slug: string
  impressionSlug: string | null
  viewersCount: number
  qr: {
    code: boolean
    link: string | null
  }
  companion: {
    cta: string
    heading: string
    text: string
  }
  pixels: {
    clicks: string[]
    impressions: string[]
  }
  adSet: IAdSet
  attachments: IAttachments
  stream: IStreamInfo
}

export interface IDemoCreative {
  id: number
  uuid: string
  slug: string
  impressionSlug: null
  viewersCount: number
  qr: {
    code: boolean
    link: string | null | false
  }
  companion: {
    cta: string
    heading: string
    text: string
  }
  pixels: {
    clicks: string[]
    impressions: string[]
    inspections: string[]
  }
  adSet: {
    format: AdFormat
    campaign: {
      type: CampaignType
      ordMarkup: string
    }
    advertiser?: {
      legalName: string
      tin: string
    }
    makeScreenshots: boolean
  }
  attachments: IAttachments
}

export type IPromoCreative = IDemoCreative
