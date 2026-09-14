import { defineStore } from 'pinia'

import { Logger } from '@/core/helpers'
import type { TCheckList, TTier } from '@/modules/Streamer/views/Dashboard/api'
import * as dashboardApi from '@/modules/Streamer/views/Dashboard/api'

export interface IDashboardState {
	isFetchingChecklist: boolean
	checklist: null | TCheckList
	isFetchingTier: boolean
	tier: {
		data: null | TTier
		selectedLevel: null | number
	}
}

export const useDashboardStore = defineStore('dashboard', {
	state: (): IDashboardState => ({
		isFetchingChecklist: false,
		checklist: null,
		isFetchingTier: false,
		tier: {
			data: null,
			selectedLevel: null,
		},
	}),

	actions: {
		async fetchCheckList () {
			try {
				this.isFetchingChecklist = true
				this.checklist = await dashboardApi.getCheckList()
			}
			catch(err) {
				Logger.error('Error fetching user checklist', true, err)
			}
			finally {
				this.isFetchingChecklist = false
			}
		},

		async closeCheckList () {
			try {
				this.isFetchingChecklist = true
				await dashboardApi.closeCheckList()
				if (this.checklist) {
					this.checklist.close = true
				}
			}
			catch(err) {
				Logger.error('Error closing user checklist', true, err)
			}
			finally {
				this.isFetchingChecklist = false
			}
		},

		async fetchTier () {
			try {
				this.isFetchingTier = true
				const res = await dashboardApi.getTier()

				if (res) {
					this.tier.data = res
					this.tier.selectedLevel = res.current.level === 0 ? 1 : res.current.level
				}
			}
			catch(err) {
				Logger.error('Error fetching user tier', true, err)
			}
			finally {
				this.isFetchingTier = false
			}
		},
	},
})
