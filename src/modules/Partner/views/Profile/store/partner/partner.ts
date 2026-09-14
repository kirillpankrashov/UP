import { defineStore } from 'pinia'

import type { TPartner } from '@/core/types'
import { Logger } from '@/core/helpers'
import type { IChangePasswordData } from '@/modules/Partner/views/Profile/api'
import * as ProfileApi from '@/modules/Partner/views/Profile/api'
import type { IUpdateProfileData } from '@/modules/Partner/views/Profile/api/updateProfile/types'

export interface IPartnerState {
	isFetching: boolean
	profile: null | TPartner
}

export const usePartnerStore = defineStore('partner', {
	state: (): IPartnerState => ({
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

		async updateProfile (data: IUpdateProfileData) {
			try {
				const res = await ProfileApi.updateProfile(data)

				if (res) {
					this.fetchProfile()
				}
			}
			catch(err) {
				Logger.error('Error updating profile', true, err)
			}
		},

		async changePassword (data: IChangePasswordData) {
			try {
				const res = await ProfileApi.changePassword(data)

				if (res) {
					await this.fetchProfile()
				}
			}
			catch(err) {
				Logger.error('Error changing password', true, err)
			}
		},
	},
})
