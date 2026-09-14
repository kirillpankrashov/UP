import type { ICpmStarCreativeInfo, ISspCreativeInfo } from '@/modules/Widget/types'

export interface IAttachmentExtendedInfo {
  pixel_impressions?: string[]
  metacount?: string
  rtbcount?: string
  legal_compliance?: {
    erid: {
      media: string
      text: string
    }
    marker: {
      media: string
      text: string
    }
  }
  stream: {
    bidfloor: number
    bid_cap: number
  }
  ssp?: ISspCreativeInfo
	cpmStar?: ICpmStarCreativeInfo
  script_code?: string
}