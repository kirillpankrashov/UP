import type { LocaleMessages } from 'vue-i18n'

import type { Locale } from '@/core/types'
import { getDomain } from '@/core/helpers'
import { i18n } from '@/core/i18n'

export const useMergeLocaleMessages = (messages: LocaleMessages<Record<string, any>>) => {
	Object.keys(messages).forEach((locale) => {
		if (!getDomain().locales.includes(locale as Locale)) {
			return
		}

		i18n.global.mergeLocaleMessage(locale, messages[locale])
	})
}
