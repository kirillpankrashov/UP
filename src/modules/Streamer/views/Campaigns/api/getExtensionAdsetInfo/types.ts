import type {
  AdsetStatus,
  CampaignType,
  CurrencyName,
  IAdFormat,
  IAttachments,
  ICampaignAdvertiser,
  ICampaignAdvertiserResponse,
  ICampaignHolding,
  ICampaignHoldingResponse,
  ICreative,
  ICreativeResponse,
  IGallery,
  IPanel,
  IQuiz,
  IQuizResponse,
  Platform,
} from '@/core/types'

interface IExtensionAdsetInfoCreativeResponse extends Omit<ICreativeResponse, 'attachments'> {
  attachments: Omit<IAttachments, 'quiz' | 'panel' | 'gallery'> & { quiz?: IQuizResponse; panel?: IPanel; gallery?: IGallery }
}

interface IExtensionAdsetInfoCreative extends Omit<ICreative, 'attachments'> {
  attachments: Omit<IAttachments, 'quiz' | 'panel'> & { quiz?: IQuiz; panel?: IPanel; gallery?: IGallery }
}

export interface IExtensionAdsetInfoResponse {
  slug: string
  platform: Platform
  format: IAdFormat
  title: string
  description: string
  bid_cap: number
  income: number
  estimate_income: number
  impressions: number
  clicks: number
  actions: number
  start: string
  end: string
  payout_type: string
  creator_payout: number
  creator_payout_currency: CurrencyName
  currency: CurrencyName
  ads: IExtensionAdsetInfoCreativeResponse[]
  campaign: {
    id: number
    slug: string
    type: CampaignType
    title: string
    description: string
    category: string
    holding: ICampaignHolding
    advertiser: ICampaignAdvertiserResponse
    visible: boolean
  }
  holding: ICampaignHoldingResponse
  advertiser: ICampaignAdvertiserResponse
  ctr: number
  target_ctr: number
  global_target_ctr: number
  status: AdsetStatus
}

export interface IExtensionAdsetInfo {
  campaignType: CampaignType.EXTENSION
  slug: string
  platform: Platform
  format: IAdFormat
  title: string
  description: string
  bidCap: number
  income: {
    current: number
    estimate: number
  }
  impressions: number
  clicks: number
  actions: number
  dates: {
    start: string
    end: string
  }
  payoutType: string
  creatorPayout: {
    value: number
    currency: CurrencyName
  }
  currency: CurrencyName
  ads: IExtensionAdsetInfoCreative[]
  campaign: {
    id: number
    slug: string
    type: CampaignType
    title: string
    description: string
    category: string
    holding: ICampaignHolding
    advertiser: ICampaignAdvertiser
    visible: boolean
  }
  ctr: {
    current: number
    target: number | null
    global: number | null
  }
  status: AdsetStatus
}
