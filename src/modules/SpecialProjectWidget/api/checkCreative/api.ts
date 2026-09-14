import { Api } from '@/core/client'

import type { ISpCheckResponse } from '../fetchCreative/types'

export const checkCreative = async (widgetSlug: string, adsetSlug: string): Promise<boolean> => {
	const res = await Api.get<ISpCheckResponse>(
		`ads/special_project/auction/${widgetSlug}/${adsetSlug}/check`,
		undefined,
		{ showMessage: false, throwOnStatusFalse: false },
	)

	return res.status
}
