import type { IResponseData } from '@/core/types'
import { Api } from '@/core/client'

import type { TWidgetSettings, TWidgetSettingsResponse } from '../types'

import { responseToData } from './adapter'

export const getWidget = (): Promise<TWidgetSettings> => {
	return Api.get<IResponseData<TWidgetSettingsResponse>>('streamer/widget').then(
		(res) => responseToData(res.data),
	)
}
