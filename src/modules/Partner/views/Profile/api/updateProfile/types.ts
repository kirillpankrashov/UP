import type { CurrencyName } from '@/core/types'

export interface IUpdateProfileData {
	name: string
	company: string
	email: string
	currency: CurrencyName
}
