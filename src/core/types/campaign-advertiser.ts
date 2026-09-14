import type { ICampaignHolding, ICampaignWallet, ICampaignWalletResponse } from '@/core/types'

export interface ICampaignAdvertiserResponse {
	id: number
	title: string
	description: string
	wallet: ICampaignWalletResponse
	holding: ICampaignHolding
}

export interface ICampaignAdvertiser {
	id: number
	title: string
	description: string
	wallet: ICampaignWallet
	holding: ICampaignHolding
}
