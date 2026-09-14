import type { IStatus } from '@/core/types'
import { Api } from '@/core/client'

import { dataToPayload } from './adapter'
import type { IUpdateBillingData } from './types'

export const updateBilling = (data: IUpdateBillingData) => {
	return Api.post<IStatus>('partner/agency/billing/save', dataToPayload(data), {
		cache: {
			update: {
				'agency-billing-data': { type: 'deletePrefix', value: 'agency-billing-data' },
			},
		},
	})
		.then(res => res)
}
