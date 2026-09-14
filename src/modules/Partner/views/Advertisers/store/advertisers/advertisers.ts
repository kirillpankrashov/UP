import { defineStore } from 'pinia'

import { Logger } from '@/core/helpers'
import type { IAdvertiser } from '@/modules/Partner/views/Advertisers/api'
import * as AdvertisersApi from '@/modules/Partner/views/Advertisers/api'

interface State {
  isFetchingData: boolean
  advertisers: null | IAdvertiser[]
}

export const useAdvertisersStore = defineStore('partner-advertisers', {
	state: (): State => ({
		isFetchingData: false,
		advertisers: null,
	}),

	actions: {
		async fetchAdvertisers () {
			if (this.advertisers) return

			try {
				this.isFetchingData = true
				this.advertisers = await AdvertisersApi.getAdvertisers()
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
