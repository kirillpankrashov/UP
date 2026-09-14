import type { IResponseData } from '@/core/types'
import type { ILinkPoll } from '@/core/types/link'
import { LinkApi } from '@/core/client'
import type { PollFormModel } from '@/modules/Streamer/views/Link/store'

import { modelToPayload } from './adapter'

export const updatePoll = (poll: PollFormModel) => {
	return LinkApi.patch<IResponseData<ILinkPoll>>('platform/poll', modelToPayload(poll)).then(res => res.data)
}
