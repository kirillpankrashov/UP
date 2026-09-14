import type { IUnitAttachment } from '@/core/types'

export interface IConversionAlert {
  animation: IUnitAttachment
  text: string
  conversions: number
  daily_limit: number
}