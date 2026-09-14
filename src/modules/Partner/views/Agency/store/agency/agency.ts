import { defineStore } from 'pinia'

import { CurrencyIcon } from '@/core/types'
import * as AgencyApi from '@/modules/Partner/views/Agency/api'
import { type IUpdateAgencyData } from '@/modules/Partner/views/Agency/api'
import { type IAgency } from '@/modules/Partner/views/Agency/api'

import { useAgencyReferralStore } from '../referral/referral'

interface State {
  isFetchingData: boolean
  data: null | IAgency
  disabled: {
    internaleCpm: boolean
    externalCpm: boolean
    darkMarketInternalCpm: boolean
    darkMarketExternalCpm: boolean
  }
  isFormUpdating: boolean
}

export const useAgencyStore = defineStore('partner-agency', {
	state: (): State => ({
		isFetchingData: false,
		data: null,
		disabled: {
			internaleCpm: false,
			externalCpm: false,
			darkMarketInternalCpm: false,
			darkMarketExternalCpm: false,
		},
		isFormUpdating: false,
	}),

	actions: {
		async fetchData () {
			if (this.data) return

			try {
				this.isFetchingData = true

				const res = await AgencyApi.getAgency()

				this.data = res

				const agencyReferralStore = useAgencyReferralStore()

				await agencyReferralStore.fetchReferral()

				if (this.data.id === 1) {
					await agencyReferralStore.fetchReferralStreamers()
				}
			}
			finally {
				this.isFetchingData = false
			}
		},

		// _checkIfFilled () {
		// 	if (!this.data) {
		// 		return
		// 	}
		// 	this.disabled.internaleCpm = !Object.values(this.data.cpm.internalCpm ?? {}).every(val => !val)
		// 	this.disabled.externalCpm = !Object.values(this.data.cpm.externalCpm ?? {}).every(val => !val)
		// 	this.disabled.darkMarketInternalCpm = !Object.values(this.data.cpm.darkMarketInternalCpm ?? {}).every(val => !val)
		// 	this.disabled.darkMarketExternalCpm = !Object.values(this.data.cpm.darkMarketExternalCpm ?? {}).every(val => !val)
		// },

		async updateData (data: IUpdateAgencyData) {
			if (!data || this.isFormUpdating) return

			try {
				this.isFormUpdating = true

				await AgencyApi.updateAgency(data)

				await this.fetchData()

				// this._checkIfFilled()
			}
			finally {
				this.isFormUpdating = false
			}
		},
	},

	getters: {
		isUplifyAgency: (state) => {
			if (!state.data) return false

			return state.data.id === 1
		},

		currencySign: (state) => {
			if (!state.data) return null

			const currencyCode = state.data?.wallet.currency.toLocaleUpperCase() as keyof typeof CurrencyIcon

			return CurrencyIcon[currencyCode]
		},
	},
})
