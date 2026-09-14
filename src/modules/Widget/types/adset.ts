import type { AdFormat, CampaignType } from '@/core/types'

import { AdFrequency } from './ad-frequency'

export interface IAdSetResponse {
  id: number
  slug: string
  format: AdFormat
	frequency: AdFrequency
  make_screenshots: boolean
  campaign: {
    id: number
    slug: string
    type: CampaignType
    ord_markup: string
  }
  advertiser: {
    legal_name: string
    tin: string
  }
}

export interface IAdSet {
  id: number
  slug: string
  format: AdFormat
	frequency: number
  makeScreenshots: boolean
  campaign: {
    id: number
    slug: string
    type: CampaignType
    ordMarkup: string
  }
  advertiser: {
    legalName: string
    tin: string
  }
}
