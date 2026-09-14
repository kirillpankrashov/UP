import type { ICurrencyDict, ICurrencyDictResponse } from './currency'

export interface ICampaignAffiliateNetworkResponse {
	id: number
	title: string
	currency: ICurrencyDictResponse
}

export interface ICampaignAffiliateNetwork {
	id: number
	title: string
	currency: ICurrencyDict
}