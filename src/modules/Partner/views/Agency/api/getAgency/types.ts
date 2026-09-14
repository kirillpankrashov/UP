import type { IWallet, IWalletResponse, TCPM, TCPMResponse } from '@/core/types'

export interface IAgencyResponse {
  id: number
  title: string
  description: string
  streamers_participate: boolean
  use_dark_market: boolean
  commission: number | null
  cost_per_mille: TCPMResponse
  ignore_categories: number[]
  wallet: IWalletResponse
  billing_requisites: {
    name: string
    email: string
    address: string
    phone: string
    bank_name: string
    bank_account_name: string
    bank_account_holder_address: string
    bank_address: string
    bank_account_number: string
    swift_code: string
    routing_number: string
  }
}

export interface IAgency {
  id: number
  title: string
  description: string
  streamersParticipate: boolean
  useDarkMarket: boolean
  commission: number | null
  cpm: TCPM
  ignoredCategories: number[]
  wallet: IWallet
  billingRequisites: {
    name: string
    email: string
    address: string
    phone: string
    bankName: string
    bankAccountName: string
    bankAccountHolderAddress: string
    bankAddress: string
    bankAccountNumber: string
    swiftCode: string
    routingNumber: string
  }
}
