import { Api } from '@/core/client'
import { responseToWidgetAdapter } from '@/modules/Widget/adapters/widget'
import { type IWidget, type IWidgetResponse } from '@/modules/Widget/types'

export const getDebugWidget = (slug: string): Promise<IWidget> => {
	return Api.get<IWidgetResponse>(`ads/widget/${slug}/debug`).then(
		(res) => responseToWidgetAdapter(res),
	)
}
