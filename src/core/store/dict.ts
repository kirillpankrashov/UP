import { defineStore } from 'pinia'

import { CampaignType, Locale } from '@/core/types'
import { fetchDictionary, type TDictionary } from '@/core/api'
import type { ICampaignsDictionary } from '@/core/api/fetchCampaignsDictionary'
import { getCampaignsDictionary } from '@/core/api/fetchCampaignsDictionary'
// import { DICT_ALL, DICT_ALL_CACHE_TIME, DICT_ALL_UPDATED } from '@/core/consts'
import { Logger } from '@/core/helpers'

export interface IDictState {
	isFetching: boolean
	all: null | TDictionary
	campaigns: null | ICampaignsDictionary
}

export const useDictStore = defineStore('dict', {
	state: (): IDictState => ({
		isFetching: false,
		all: null,
		campaigns: null,
	}),

	actions: {
		async getAllDictionaries (locale: Locale) {
			try {

				this.isFetching = true
				this.all = await fetchDictionary(locale)
			}
			catch(err) {
				Logger.error('Error fetching dictionaries', true, err)
			}
			finally {
				this.isFetching = false
			}
		},

		async getCampaignDictionary (locale: Locale, campaignType: CampaignType) {
			try {
				this.isFetching = true
				this.campaigns = await getCampaignsDictionary(locale, campaignType)
			}
			catch(err) {
				Logger.error('Error fetching campaigns dictionary', true, err)
			}
			finally {
				this.isFetching = false
			}
		},
	},
})
