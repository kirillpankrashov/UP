import { CurrencyName,type IExchangeRate } from '@/core/types'
import { useAppStore, useDictStore } from '@/core/store'

/**
 * The function `formatCurrency` formats a number or string as currency based on the specified
 * currency type.
 * @param {number | string} sum - The `sum` parameter in the `formatCurrency` function represents
 * the numerical value that you want to format as a currency. It can be either a number or a string
 * that can be converted to a number.
 * @param [decimals=true] - The `decimals` parameter in the `formatCurrency` function determines
 * whether the formatted currency should display decimals or not. If `decimals` is set to `true`, the
 * currency will display with the specified number of decimal places. If `decimals` is set to `false`,
 * the
 * @param {CurrencyName} [to] - The `to` parameter in the `formatCurrency` function is an optional
 * parameter that specifies the target currency to format the sum into. If the `to` parameter is
 * provided, the sum will be formatted into the currency specified by the `to` parameter. If the `to`
 * parameter is
 * @returns The `formatCurrency` function returns a formatted currency string based on the input
 * `sum`, with the currency format determined by the `to` parameter or the default currency set in the
 * app store. The function uses the `Intl.NumberFormat` constructor to format the currency based on the
 * specified country and currency code. The formatted currency string is returned by the function.
 */
const formatCurrency = (
	sum: number | string,
	decimals = true,
	to?: CurrencyName,
): string => {
	sum = typeof sum === 'string' ? parseFloat(sum) : sum

	const appStore = useAppStore()
	const toCurrency = to || appStore.currency

	let countryCode: string
	let currencyCode: string

	switch (toCurrency) {
		case CurrencyName.EUR:
			countryCode = 'de-DE'
			currencyCode = 'EUR'
			break
		case CurrencyName.RUB:
			countryCode = 'ru-RU'
			currencyCode = 'RUB'
			break
		case CurrencyName.INR:
			countryCode = 'hi-IN'
			currencyCode = 'INR'
			break
		case CurrencyName.BRL:
			countryCode = 'pt-BR'
			currencyCode = 'BRL'
			break
		default:
			countryCode = 'en-US'
			currencyCode = 'USD'
			break
	}

	const formatter = new Intl.NumberFormat(countryCode, {
		style: 'currency',
		currency: currencyCode,
		maximumFractionDigits: decimals ? 2 : 0,
		minimumFractionDigits: decimals ? 2 : 0,
	})

	return formatter?.format(sum)
}

const formatNumber = (
	sum: number | string,
	decimals = true,
	to?: CurrencyName,
): string => {
	sum = typeof sum === 'string' ? parseFloat(sum) : sum

	const appStore = useAppStore()
	const toCurrency = to || appStore.currency

	let countryCode: string
	let currencyCode: string

	switch (toCurrency) {
		case CurrencyName.EUR:
			countryCode = 'de-DE'
			currencyCode = 'EUR'
			break
		case CurrencyName.RUB:
			countryCode = 'ru-RU'
			currencyCode = 'RUB'
			break
		case CurrencyName.INR:
			countryCode = 'hi-IN'
			currencyCode = 'INR'
			break
		case CurrencyName.BRL:
			countryCode = 'pt-BR'
			currencyCode = 'BRL'
			break
		default:
			countryCode = 'en-US'
			currencyCode = 'USD'
			break
	}

	const formatter = new Intl.NumberFormat(countryCode, {
		currency: currencyCode,
		maximumFractionDigits: decimals ? 2 : 0,
		minimumFractionDigits: decimals ? 2 : 0,
	})

	return formatter?.format(sum)
}

/**
 * The function `convertCurrencyName` takes a sum of money in one currency and converts it to another
 * currency using exchange rates.
 * @param {number} sum - The `sum` parameter in the `convertCurrency` function represents the amount
 * of money that you want to convert from one currency to another.
 * @param {CurrencyName} from - The `from` parameter in the `convertCurrencyName` function represents
 * the currency you are converting from. It specifies the original currency of the amount you want to
 * convert.
 * @param {CurrencyName} [to] - The `to` parameter in the `convertCurrencyName` function is an optional
 * parameter that specifies the currency to which you want to convert the sum. If the `to` parameter is
 * not provided, the function will default to using the currency stored in the `appStore`.
 * @returns The `useCurrency` function is returning an object with two properties: `formatCurrency`
 * and `convertCurrency`.
 */
const convertCurrency = (
	sum: number,
	from: CurrencyName,
	to?: CurrencyName,
): number => {
	const appStore = useAppStore()
	const dictStore = useDictStore()
	const toCurrency = to || appStore.currency
	const rates = dictStore.all?.exchangeRates || []
	let result = sum

	rates.forEach((item: IExchangeRate) => {
		if (item.fromCurrency === from && item.toCurrency === toCurrency) {
			result = item.rate * sum
		}
	})

	return result
}

export const useCurrency = () => {
	return {
		formatCurrency,
		formatNumber,
		convertCurrency,
	}
}
