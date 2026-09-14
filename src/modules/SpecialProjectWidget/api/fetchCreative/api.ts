import { Api } from '@/core/client'

import { responseToSpCreative } from './adapter'
import type { ISpCreative, ISpFetchResponse } from './types'

export const fetchCreative = async (widgetSlug: string, adsetSlug: string): Promise<ISpCreative | null> => {
	const res = await Api.get<ISpFetchResponse>(
		`ads/special_project/auction/${widgetSlug}/${adsetSlug}`,
		undefined,
		{ showMessage: false, throwOnStatusFalse: false },
	)

	if (!res.status || Array.isArray(res.data)) return null

	const item = res.data.items[0]
	if (!item) return null

	return responseToSpCreative(item, res.data.stream)
}
