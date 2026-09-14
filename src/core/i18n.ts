import { createI18n, type PluralizationRulesMap } from 'vue-i18n'

import { DomainURL, Locale } from '@/core/types'
import { getDomain } from '@/core/helpers'
import { messages } from '@/core/locales'

const pluralizationRules: PluralizationRulesMap = {
	ru: function (choice, choicesLength) {
		if (choice === 0) {
			return 0
		}

		const teen = choice > 10 && choice < 20
		const endsWithOne = choice % 10 === 1

		if (choicesLength < 4) {
			return !teen && endsWithOne ? 1 : 2
		}
		if (!teen && endsWithOne) {
			return 1
		}
		if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
			return 2
		}

		return choicesLength < 4 ? 2 : 3
	},
}

const appLocale = localStorage.getItem('locale') || import.meta.env.VITE_APP_DEFAULT_LOCALE

if (!getDomain().locales.includes(appLocale) || !appLocale) {
	const browserLocale = window.navigator.language
	let defaultAppLocale = import.meta.env.VITE_APP_DEFAULT_LOCALE || Locale.EN

	if (
		!browserLocale.includes(Locale.PT) &&
    window.location.origin === DomainURL.PARETO
	) {
		defaultAppLocale = Locale.PT
	}
	else if (
		!browserLocale.includes(Locale.RU) &&
    window.location.origin === DomainURL.STREAMMONEY
	) {
		defaultAppLocale = Locale.RU
	}
	else if (
		!browserLocale.indexOf(Locale.ES) &&
    window.location.origin === DomainURL.GAMING_PARTNERS
	) {
		defaultAppLocale = Locale.ES
	}
	else if (
		!browserLocale.indexOf(Locale.EN) &&
    window.location.origin === DomainURL.AMPVERSE
	) {
		defaultAppLocale = Locale.EN
	}

	localStorage.setItem('locale', defaultAppLocale)
}

export const i18n = createI18n({
	locale: localStorage.getItem('locale') || import.meta.env.VITE_APP_DEFAULT_LOCALE,
	fallbackLocale: Locale.EN,
	pluralRules: pluralizationRules,
	legacy: false,
	warnHtmlInMessage: false,
	warnHtmlMessage: false,
	messages,
})
