import { defineStore } from 'pinia'

import type { ILinkAlerts } from '@/core/types/link'
import { Logger } from '@/core/helpers'
import * as LinkApi from '@/modules/Streamer/views/Link/api'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

interface State {
  isBootsraped: boolean
  isLoadingData: boolean
	data: ILinkAlerts | null
}

export const useLinkAlertsStore = defineStore('linkAlerts', {
	state: (): State => ({
		isBootsraped: false,
		isLoadingData: false,
		data: null,
	}),

	actions: {
		async fetchAlerts () {
			const streamerStore = useStreamerStore()

			if (!streamerStore.streamerId) {
				Logger.error('No streamer data fetched yet', false)
				return
			}

			try {
				this.isLoadingData = true
				this.data = await LinkApi.getAlerts()
			}
			catch(err) {
				Logger.error('Error fetching alerts data', true, err)
			}
			finally {
				this.isBootsraped = true
				this.isLoadingData = false
			}
		},

		async updateAlerts (data: ILinkAlerts) {
			const streamerStore = useStreamerStore()

			if (!streamerStore.streamerId) {
				Logger.error('No streamer data fetched yet', false)
				return
			}

			try {
				this.isLoadingData = true
				await LinkApi.updateAlerts(data)
				this.data = data
			}
			catch(err) {
				Logger.error('Error updating alerts data', true, err)
			}
			finally {
				this.isLoadingData = false
			}
		},

		async requestDemo () {
			const streamerStore = useStreamerStore()

			if (!streamerStore.streamerId) {
				Logger.error('No streamer data fetched yet', false)
				return
			}

			try {
				this.isLoadingData = true
				await LinkApi.requestDemo()
			}
			catch(err) {
				Logger.error('Error sending demo', true, err)
			}
			finally {
				this.isLoadingData = false
			}
		},
	},
})
