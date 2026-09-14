import type { ICampaignWallet, ICampaignWalletResponse, IHolding } from '@/core/types'

export interface IAdvertiserResponse {
  id: number | string
  title: string
  description: string | null
  wallet: ICampaignWalletResponse
  holding: IHolding
}

export interface IAdvertiser {
  id: number | string
  title: string
  description: string | null
  wallet: ICampaignWallet
  holding: IHolding
}
