import type { Locale } from '@/core/types'
import { Api, CacheTTL } from '@/core/client'

import { responseToData } from './adapter'
import type { TDictionary, TDictionaryResponse } from './types'

export const fetchDictionary = (locale: Locale): Promise<TDictionary> => {
	return Api.get<TDictionaryResponse>('dictionary/all', { locale }, {
		cache: {
			id: 'dict-all',
			ttl: CacheTTL.ONE_DAY,
			// update: {
			// 	'dict-all': 'delete',
			// },
		},
	}).then(
		(res) => responseToData(res),
	)
}
