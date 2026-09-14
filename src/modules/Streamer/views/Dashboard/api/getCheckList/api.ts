import type { IResponseData } from '@/core/types'
import { Api } from '@/core/client'

import { responseToData } from './adapter'
import type { TCheckList, TCheckListResponse } from './types'

export const getCheckList = (): Promise<TCheckList> => {
	return Api.get<IResponseData<TCheckListResponse>>('streamer/dashboard/check-list').then(
		(res) => responseToData(res.data),
	)
}
