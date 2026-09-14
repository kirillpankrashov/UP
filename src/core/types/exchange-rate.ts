import type { CurrencyName } from './currency'

export interface IExchangeRate {
	fromCurrency: CurrencyName
	toCurrency: CurrencyName
	rate: number
}
