export enum CurrencyName {
  USD = 'usd',
  RUB = 'rub',
  INR = 'inr',
  EUR = 'eur',
  BRL = 'brl',
	MXN = 'mxn'
}

export enum CurrencyIcon {
  USD = '$',
  RUB = '₽',
  INR = '₹',
  EUR = '€',
  BRL = 'R$',
	MXN = 'MXN'
}

export interface ICurrency {
	id: CurrencyName
	icon: CurrencyIcon
	title: string
}

export interface ICurrencyDictResponse {
	code: CurrencyName
	en_title: string
	ru_title: string
	flag: CurrencyIcon
	visible: boolean
	pt_title: string
	es_title: string
}

export interface ICurrencyDict {
	code: CurrencyName
	enTitle: string
	ruTitle: string
	flag: CurrencyIcon
	visible: boolean
	ptTitle: string
	esTitle: string
}
