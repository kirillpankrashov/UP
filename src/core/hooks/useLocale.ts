import { onBeforeMount } from 'vue'
import type { LocaleMessages } from 'vue-i18n'
import { useI18n } from 'vue-i18n'

import { messages as commonMessages } from '@/core/locales'

import { useMergeLocaleMessages } from './useMergeLocaleMessages'

export const useLocale = <T>(messages: LocaleMessages<Record<string, any>>) => {
	onBeforeMount(() => {
		useMergeLocaleMessages(messages)
	})

	const { t, tm } = useI18n<{messages: T & typeof commonMessages }>()

	return { t, tm }
}
