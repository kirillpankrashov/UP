import { defineStore } from 'pinia'

import type { IHolding } from '@/core/types'
import { Logger } from '@/core/helpers'
import * as AdvertisersApi from '@/modules/Partner/views/Advertisers/api'

interface State {
  isFetchingData: boolean
  holdings: null | IHolding[]
}

export const useHoldingsStore = defineStore('partner-holdings', {
	state: (): State => ({
		isFetchingData: false,
		holdings: null,
	}),

	actions: {
		async fetchHoldings () {
			if (this.holdings) return

			try {
				this.isFetchingData = true
				this.holdings = await AdvertisersApi.getHoldings()
			}
			catch(err) {
				Logger.error('Error fetching advertisers list', true, err)
			}
			finally {
				this.isFetchingData = false
			}
		},
	},
})
