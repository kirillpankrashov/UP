import { defineStore } from 'pinia'

import { Logger } from '@/core/helpers'
import * as AgencyApi from '@/modules/Partner/views/Agency/api'
import {
	type IStreamer,
	type IStreamerAdset,
	type IStreamerInfo,
} from '@/modules/Partner/views/Agency/api'

interface State {
  isBootstrapped: boolean
  isFetchingStreamers: boolean
  isFetchingStreamerInfo: boolean
  isFetchingStreamerAdsets: boolean
  isFormUpdating: boolean
	streamers: {
		total: number
		perPage: number
		page: number
		data: IStreamer[]
		loading: boolean
		isFetched: boolean
	}
  streamerInfo: null | IStreamerInfo
  streamerCampaigns: null | IStreamerAdset[]
  streamerId: null | number
  settingsSidebarVisible: boolean
  adsetsSidebarVisible: boolean
}

export const useAgencyStreamersStore = defineStore('partner-agency-streamers', {
	state: (): State => ({
		isBootstrapped: false,
		isFetchingStreamers: false,
		isFetchingStreamerInfo: false,
		isFetchingStreamerAdsets: false,
		isFormUpdating: false,
		streamers: {
			total: 0,
			perPage: 0,
			page: 0,
			data: [],
			loading: false,
			isFetched: false,
		},
		streamerInfo: null,
		streamerCampaigns: null,
		streamerId: null,
		settingsSidebarVisible: false,
		adsetsSidebarVisible: false,
	}),

	actions: {
		async fetchStreamers (page = 1, append = false, search = '') {
			try {
				this.isFetchingStreamers = true

				const res = await AgencyApi.getStreamers({ page, q: search })

				this.streamers.page = page
				this.streamers.total = res.total
				this.streamers.perPage = res.perPage

				if (append && this.streamers.data.length > 0) {
					this.streamers.data = [
						...this.streamers.data,
						...res.data,
					]
				}
				else {
					this.streamers.data = res.data
				}

				this.isBootstrapped = true
			}
			catch (err) {
				Logger.error('Error fetching agency creators', true, err)
			}
			finally {
				this.isFetchingStreamers = false
			}
		},

		async fetchStreamerInfo (streamerId: number) {
			this.settingsSidebarVisible = true

			if (this.streamerId === streamerId) {
				return
			}

			try {
				this.isFetchingStreamerInfo = true

				const res = await AgencyApi.getStreamerInfo(streamerId)

				this.streamerId = streamerId
				this.streamerInfo = res
			}
			catch (err) {
				Logger.error('Error fetching streamer info', true, err)
			}
			finally {
				this.isFetchingStreamerInfo = false
			}
		},

		async fetchStreamerAdsets (streamerId: number) {
			this.adsetsSidebarVisible = true

			if (this.streamerId === streamerId) {
				return
			}

			try {
				this.isFetchingStreamerAdsets = true

				const res = await AgencyApi.getStreamerAdsets(streamerId)

				this.streamerId = streamerId
				this.streamerCampaigns = res
			}
			finally {
				this.isFetchingStreamerAdsets = false
			}
		},

		async updateStreamerInfo (model: IStreamerInfo) {
			if (!this.streamerId || !this.streamerInfo) {
				Logger.warning('No streamer currently selected')
				return
			}

			try {
				this.isFormUpdating = true
				await AgencyApi.updateStreamerInfo(this.streamerId, model)
			}
			finally {
				this.isFormUpdating = false
			}
		},

		// _getCurrentListItemCreator () {
		// 	return this.list?.data.find(creator => creator.id === this.creatorId)
		// },
	},

	getters: {
		selectedStreamer: (state) => {
			if (!state.streamerId) return null

			return state.streamers.data.find(streamer => streamer.id === state.streamerId) || null
		},
	},
})
