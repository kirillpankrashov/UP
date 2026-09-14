import type { TCountryId } from './country'

export enum Locale {
	EN = 'en',
	ES = 'es',
	PT = 'pt',
	RU = 'ru',
}

export interface ILocale {
	id: TCountryId
	title: string
	icon: null | string
}
