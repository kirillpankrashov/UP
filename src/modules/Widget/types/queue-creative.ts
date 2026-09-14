import type { ICreative, IPromoCreative } from './creative'

export interface IQueueCreative <T extends IPromoCreative | ICreative> {
  whenDisplay: number
  adSet: T[]
}