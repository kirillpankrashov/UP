import type { LocaleMessages } from 'vue-i18n'

import { default as en } from './en'
import { default as es } from './es'
import { default as pt } from './pt'
import { default as ru } from './ru'

export const messages: LocaleMessages<typeof en> = {
	en,
	es,
	pt,
	ru,
}
