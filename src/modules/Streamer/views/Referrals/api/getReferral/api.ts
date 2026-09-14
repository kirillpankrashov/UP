import type { IResponseData } from '@/core/types'
import { Api } from '@/core/client'

import type { IReferral } from './types'

export const getReferral = (): Promise<IReferral> => {
	return Api.get<IResponseData<IReferral>>('streamer/referral', undefined, { showMessage: false }).then(
		(res) => res.data,
	)
}
