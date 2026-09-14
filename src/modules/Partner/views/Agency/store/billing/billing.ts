import { defineStore } from 'pinia'

import { Logger } from '@/core/helpers'
import * as AgencyApi from '@/modules/Partner/views/Agency/api'
import {
	type IBilling,
	type IInvoice,
} from '@/modules/Partner/views/Agency/api'

interface State {
  isFetchingData: boolean
  billing: null | IBilling
  invoices: {
		total: number
		perPage: number
		page: number
		data: IInvoice[]
		loading: boolean
		isFetched: boolean
	}
  isFormUpdating: boolean
}
export const useBillingStore = defineStore('partner-agency-billing', {
	state: (): State => ({
		isFetchingData: false,
		isFormUpdating: false,
		billing: null,
		invoices: {
			total: 0,
			perPage: 0,
			page: 0,
			data: [],
			loading: false,
			isFetched: false,
		},
	}),

	actions: {
		async fetchInvoices (page = 1) {
			try {
				this.invoices.loading = true

				const res = await AgencyApi.getInvoices(page)

				this.invoices.data = res.data
				this.invoices.total = res.total
				this.invoices.perPage = res.perPage
				this.invoices.page = page
				this.invoices.isFetched = true
			}
			catch (err) {
				Logger.error('Error fetching invoices', true, err)
			}
			finally {
				this.invoices.loading = false
			}
		},

		async fetchBilling () {
			if (this.billing) return

			try {
				this.isFetchingData = true
				const res = await AgencyApi.getBilling()
				this.billing = res
			}
			catch (err) {
				Logger.error('Error fetching billing', true, err)
			}
			finally {
				this.isFetchingData = false
			}
		},

		async updateData (model: IBilling) {
			if (!this.billing || this.isFormUpdating) return

			try {
				this.isFormUpdating = true

				await AgencyApi.updateBilling(model)
			}
			catch (err) {
				Logger.error('Error updating billing', true, err)
			}
			finally {
				this.isFormUpdating = false
			}
		},
	},
})
