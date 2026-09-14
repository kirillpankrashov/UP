import type { CurrencyName } from '@/core/types'

export interface IStreamerResponse {
  id: number
  name: string
  last_activity_at: string
  wallet: {
    balance: number
    currency: CurrencyName
  }
  campaigns: number
  check_list_status: boolean
  payable_status: boolean
  ctr_status: boolean
}

export interface IStreamer {
  id: number
  name: string
  lastActivity: string
  wallet: {
    balance: number
    currency: CurrencyName
  }
  campaigns: number
  checkListStatus: boolean
  payableStatus: boolean
  ctrStatus: boolean
}
