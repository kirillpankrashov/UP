import type { DomainName, Locale } from '@/core/types'

export type TProfileModel = {
	domain: DomainName
	email: string
	language: Locale
	country: Locale
	gender: string
	birthday: string
	referral?: string
	utm?: string
	promo?: string
}

export type TProfilePayload = {
	domain: DomainName
	email: string
	language: Locale
	country: Locale
	gender: string
	birthday: string
	referral?: string
	utm?: string
	promo?: string
}
