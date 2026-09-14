import { defineStore } from 'pinia'

import type { Locale } from '@/core/types'
import { Logger } from '@/core/helpers'
import type { IPanel,IReferral } from '@/modules/Streamer/views/Referrals/api'
import * as ReferralsApi from '@/modules/Streamer/views/Referrals/api'

type TStatus = {
	sending: boolean
	success: boolean
}

interface State {
	isFetchingRefferal: boolean
	isFetchingPanels: boolean
	referral: null | IReferral
	panels: IPanel[]
	promotion: TStatus
	widgetPreview: TStatus
}

export const useReferralsStore = defineStore('referrals', {
	state: (): State => ({
		isFetchingRefferal: false,
		isFetchingPanels: false,
		referral: null,
		panels: [],
		promotion: {
			sending: false,
			success: false,
		},
		widgetPreview: {
			sending: false,
			success: false,
		},
	}),

	actions: {
		async fetchReferral () {
			this.isFetchingRefferal = true

			try {
				this.referral = await ReferralsApi.getReferral()
			}
			catch(err) {
				Logger.error('Error fetching streamer referral data', true, err)
			}
			finally {
				this.isFetchingRefferal = false
			}
		},

		async togglePromotion (status: string | number | boolean) {
			if (!this.referral) {
				Logger.error('There is no referral data yet', true)
				return
			}

			try {
				this.promotion.sending = true
				await ReferralsApi.togglePromotion(status as boolean)
				this.promotion.success = true
				setTimeout(() => this.promotion.success = false, 1500)
			}
			catch(err) {
				Logger.error('Error updating promotion status', true, err)
			}
			finally {
				this.promotion.sending = false
			}
		},

		async sendWidgetPreview () {
			try {
				this.widgetPreview.sending = true
				await ReferralsApi.sendWidgetPreview()
				this.widgetPreview.success = true
				setTimeout(() => this.widgetPreview.success = false, 1500)
			}
			catch(err) {
				Logger.error('Error sending preview to widget', true, err)
			}
			finally {
				this.widgetPreview.sending = false
			}
		},

		async fetchPanels (locale: Locale) {
			this.isFetchingPanels = true

			try {
				this.panels = await ReferralsApi.getPanels(locale)
			}
			catch(err) {
				Logger.error('Error fetching panels', true, err)
			}
			finally {
				this.isFetchingPanels = false
			}
		},
	},
	getters: {
		statistics(state) {
			return {
				amount: state.referral?.amount || 0,
				currency: state.referral?.currency,
				invited: state.referral?.invited || 0,
			}
		},
	},
})
