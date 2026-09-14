import type { IResponseMessage, Locale } from '@/core/types'
import { Api } from '@/core/client'

export const saveLocale = (locale: Locale) => {
	return Api.post<IResponseMessage>('locale/save', { locale }, {
		cache: {
			update: {
				'dict-all': 'delete',
				'dict-campaigns': { type: 'deletePrefix', value: 'dict-campaigns' },
			},
		},
	})
}
