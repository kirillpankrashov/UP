import {
	type IRazorPayUser,
	type IResponseMessage,
	type IStreamerPayoutPayload,
	type ITipaltiUser,
	type ITochkaBankUser,
	PayoutService,
} from '@/core/types'
import { Api } from '@/core/client'

import { modelToPayload } from './adapter'

type savePayoutMethodArgs = {
	(method: PayoutService.RAZOR_PAY, model: IRazorPayUser): void
	(method: PayoutService.TIPALTI, model: ITipaltiUser): void
	(method: PayoutService.TOCHKA_BANK, model: ITochkaBankUser): void
}

const getPayload = (method: PayoutService, model: IStreamerPayoutPayload) => {
	switch (method) {
		case PayoutService.RAZOR_PAY:
			return modelToPayload(method, model as IRazorPayUser)
		case PayoutService.TIPALTI:
			return modelToPayload(method, model as ITipaltiUser)
		case PayoutService.TOCHKA_BANK:
			return modelToPayload(method, model as ITochkaBankUser)
		default:
			throw new Error('Unsupported payout service')
	}
}

export const savePayoutMethod: savePayoutMethodArgs = (method: PayoutService, model: IStreamerPayoutPayload) => {
	return Api.post<IResponseMessage>(
		`streamer/payment/${method}/save`,
		getPayload(method, model),
	)
}
