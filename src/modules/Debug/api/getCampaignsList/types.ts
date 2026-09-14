import { AdFormat, type ICampaignAdvertiserResponse,type ICampaignHoldingResponse } from '@/core/types'

export interface IDebugAdset {
  id: number
  campaign: {
    id: number
    slug: string
    type: string
    title: string
    description: string
    category: string
    holding: ICampaignHoldingResponse
    advertiser: ICampaignAdvertiserResponse
    visible: boolean
  }
  slug: string
  format: AdFormat
  title: string
  created: string
  published: boolean
  visible: boolean
}
