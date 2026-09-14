import { defineStore } from 'pinia'

import type { ILinkProfile } from '@/core/types/link/profile'
import { Logger } from '@/core/helpers'
import * as LinkApi from '@/modules/Streamer/views/Link/api'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

export const ABOUT_MAX_LENGTH = 1000

interface State {
  isLoadingData: boolean
	isUpdatingData: boolean
  profile: null | ILinkProfile
}

export const useLinkProfileStore = () => {
	const streamerStore = useStreamerStore()

	return defineStore('linkProfile', {
		state: (): State => ({
			isLoadingData: false,
			isUpdatingData: false,
			profile: null,
		}),

		actions: {
			async fetchProfile () {
				if (this.profile || this.isLoadingData) {
					return
				}

				try {
					this.isLoadingData = true
					this.profile = await LinkApi.getProfile()
				}
				catch(err) {
					Logger.error('Error fetching streamer profile', true, err)
				}
				finally {
					this.isLoadingData = false
				}
			},

			async updateProfile (data: Partial<ILinkProfile>, rethrow = false) {
				try {
					if (!this.profile) {
						throw new Error('There is no Link profile data yet')
					}

					this.isUpdatingData = true

					const profile = {
						...this.profile,
						...data,
					}

					await LinkApi.updateProfile(profile)

					this.profile = profile
				}
				catch(err) {
					Logger.error('Error updating profile data', true, err)

					if (rethrow) {
						throw err
					}
				}
				finally {
					this.isUpdatingData = false
				}
			},
		},

		getters: {
			linkName: (state) => {
				if (!streamerStore.profile) {
					return import.meta.env.VITE_APP_FREEMIUM_URL || 'https://uplify.link'
				}

				if (state.profile?.linkName) {
					return `${import.meta.env.VITE_APP_FREEMIUM_URL}${streamerStore.profile.locale}/${state.profile.linkName}`
				}

				return `${import.meta.env.VITE_APP_FREEMIUM_URL}${streamerStore.profile.locale}/${streamerStore.profile.userId}`
			},
		},
	})()
}
