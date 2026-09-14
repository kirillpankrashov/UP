import type { IResponse } from '@/core/types'
import { Api } from '@/core/client'

import type { TBrandisStatus } from './types'

export const checkBrandisExtension = () => {
	return Api.get<IResponse<TBrandisStatus>>('streamer/extension/brandis/activation/check', undefined, {
		cache: {
			update: {
				'streamer-performance-adsets': { type: 'deletePrefix', value: 'streamer-performance-adsets' },
				'streamer-performance-adsets-short': { type: 'deletePrefix', value: 'streamer-performance-adsets-short' },
			},
		},
	})
}
