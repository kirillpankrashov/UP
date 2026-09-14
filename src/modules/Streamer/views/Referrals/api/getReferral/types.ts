import type { CurrencyName } from '@/core/types'

export interface IReferral {
  link: string
  invited: number
  amount: number
  currency: CurrencyName
  promotion: boolean
  const: {
    referrer: number
    referral: number
    currency: CurrencyName
  }
}
