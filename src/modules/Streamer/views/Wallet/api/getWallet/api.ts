import type { IResponseData } from '@/core/types'
import type { IStreamerWallet, IStreamerWalletResponse } from '@/core/types'
import { Api } from '@/core/client'

import { responseToData } from './adapter'

export const getWallet = (): Promise<IStreamerWallet> => {
	return Api.get<IResponseData<IStreamerWalletResponse>>('streamer/wallet').then(
		(res) => responseToData(res.data),
	)
}
