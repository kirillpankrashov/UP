import type { IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

import type { TWidgetSettings } from '../types'

import { modelToPayload } from './adapter'

export const updateWidget = (model: TWidgetSettings) => {
	return Api.post<IResponseMessage>('streamer/widget', modelToPayload(model)).then(
		(res) => res,
	)
}
