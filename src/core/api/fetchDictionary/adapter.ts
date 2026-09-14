import type { TDictionary, TDictionaryResponse } from './types'

export const responseToData = (response: TDictionaryResponse): TDictionary => {
	return {
		status: response.status,
		campaignsCategories: response.campaigns_categories.map(category => ({
			id: category.id,
			title: category.title,
			icon: category.icon,
			darkMarket: category.dark_market,
		})),
		campaignsPositions: response.campaigns_positions,
		countries: response.countries,
		currencies: response.currencies,
		exchangeRates: response.exchange_rates.map(rate => ({
			fromCurrency: rate.from_currency,
			toCurrency: rate.to_currency,
			rate: rate.rate,
		})),
		gender: response.gender,
		languages: response.languages,
		locales: response.locales,
		platforms: response.platforms,
		tags: response.tags,
		timeZones: response.time_zones,
		sspTextFrequency: response.ssp_text_frequency,
		minimumPaymentAmount: response.payment_minimum_amount,
		devices: response.devices,
		widgetFrequencies: response.widget_frequency,
	}
}
