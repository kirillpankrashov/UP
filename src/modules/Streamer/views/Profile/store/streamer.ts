import { defineStore } from 'pinia'

import type { TStreamer } from '@/core/types'
import { Logger } from '@/core/helpers'
import * as ProfileApi from '@/modules/Streamer/views/Profile/api'

export interface IStreamerState {
	isFetching: boolean
	profile: null | TStreamer
}

export const useStreamerStore = defineStore('streamer', {
	state: (): IStreamerState => ({
		isFetching: false,
		profile: null,
	}),

	actions: {
		async fetchProfile () {
			try {
				this.isFetching = true
				this.profile = await ProfileApi.getProfile()
			}
			catch(err) {
				Logger.error('Error fetching user data', true, err)
			}
			finally {
				this.isFetching = false
			}
		},
	},

	getters: {
		streamerId (state) {
			return state.profile?.userId || null
		},
	},
})
