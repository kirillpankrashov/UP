import type { CurrencyName } from '@/core/types'

export interface IReferral {
  link: string
  invited: number
  balance: number
  currency: CurrencyName
}
