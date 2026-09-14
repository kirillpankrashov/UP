import type { ICurrencyDict, ICurrencyDictResponse } from '@/core/types'

export interface IInvoiceResponse {
  date: string
  amount: number
  currency: ICurrencyDictResponse
  invoice: string | null
}

export interface IInvoice {
  date: string
  amount: number
  currency: ICurrencyDict
  invoice: string | null
}
