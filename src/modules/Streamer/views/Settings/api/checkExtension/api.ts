import type { IResponse } from '@/core/types'
import { Api } from '@/core/client'

import type { TExtensionStatus } from './types'

export const checkExtension = () => {
	return Api.get<IResponse<TExtensionStatus>>('streamer/extension/activation/check', undefined, {
		cache: {
			update: {
				'streamer-extension-adsets-short': { type: 'deletePrefix', value: 'streamer-extension-adsets-short' },
				'streamer-extension-adsets': { type: 'deletePrefix', value: 'streamer-extension-adsets' },
			},
		},
	})
}
