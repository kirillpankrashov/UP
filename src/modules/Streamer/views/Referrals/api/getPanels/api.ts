import type { IResponseData, Locale } from '@/core/types'
import { Api } from '@/core/client'

import type { IPanel } from './types'

export const getPanels = (locale: Locale): Promise<IPanel[]> => {
	return Api.get<IResponseData<IPanel[]>>('streamer/referral/panels', { locale }).then(
		(res) => res.data,
	)
}
