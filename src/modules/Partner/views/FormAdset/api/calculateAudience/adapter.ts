import { CampaignType } from '@/core/types'
import type { ICreateAdsetModel } from '@/modules/Partner/views/FormAdset/types'

import type { ICreateBrandAwarenessAdsetData } from '../createBrandAwarenessAdset/types'
import type { ICreatePerformanceAdsetData } from '../createPerformanceAdset/types'
import type { ICreatePrerollAdsetData } from '../createPrerollAdset/types'

import type { IAudiencePayload } from './types'

export const dataToPayload = (campaignType: CampaignType, data: ICreateAdsetModel): IAudiencePayload => {
	if (campaignType === CampaignType.PREROLL) {
		const prerollData = data as ICreatePrerollAdsetData
		return {
			platform: data.platform,
			start: prerollData.dates.start ?? '',
			end: prerollData.dates.end ?? '',
			streamers: prerollData.targeting.streamers.list,
			exclude_streamers: prerollData.targeting.streamers.exclude,
			broadcaster_languages: prerollData.targeting.broadcasterLanguages.list,
			exclude_languages: prerollData.targeting.broadcasterLanguages.exclude,
			countries: prerollData.targeting.countries.list,
			exclude_countries: prerollData.targeting.countries.exclude,
			countries_auditory: prerollData.targeting.countriesAuditory.list,
			exclude_countries_auditory: prerollData.targeting.countriesAuditory.exclude,
			devices_auditory: prerollData.targeting.devicesAuditory.list,
			exclude_devices_auditory: prerollData.targeting.devicesAuditory.exclude,
			age_from: null,
			age_to: null,
			gender: null,
			mature: false,
			tags: prerollData.targeting.tags.list,
			exclude_tags: prerollData.targeting.tags.exclude,
			agencies: prerollData.targeting.agencies,
			min_cpm: null,
			max_cpm: null,
		}
	}

	if (campaignType === CampaignType.PERFORMANCE) {
		const performanceData = data as ICreatePerformanceAdsetData
		return {
			platform: performanceData.platform,
			start: performanceData.dates.start ?? '',
			end: performanceData.dates.end ?? '',
			streamers: performanceData.targeting.streamers.list,
			exclude_streamers: performanceData.targeting.streamers.exclude,
			broadcaster_languages: performanceData.targeting.broadcasterLanguages.list,
			exclude_languages: performanceData.targeting.broadcasterLanguages.exclude,
			countries: performanceData.targeting.countries.list,
			exclude_countries: performanceData.targeting.countries.exclude,
			countries_auditory: performanceData.targeting.countriesAuditory.list,
			exclude_countries_auditory: performanceData.targeting.countriesAuditory.exclude,
			devices_auditory: performanceData.targeting.devicesAuditory.list,
			exclude_devices_auditory: performanceData.targeting.devicesAuditory.exclude,
			age_from: null,
			age_to: null,
			gender: null,
			mature: false,
			tags: performanceData.targeting.tags.list,
			exclude_tags: performanceData.targeting.tags.exclude,
			agencies: performanceData.targeting.agencies,
			min_cpm: null,
			max_cpm: null,
		}
	}

	const brandAwarenessData = data as ICreateBrandAwarenessAdsetData

	return {
		platform: brandAwarenessData.platform,
		start: brandAwarenessData.dates.start ?? '',
		end: brandAwarenessData.dates.end ?? '',
		streamers: brandAwarenessData.targeting.streamers.list,
		exclude_streamers: brandAwarenessData.targeting.streamers.exclude,
		broadcaster_languages: brandAwarenessData.targeting.broadcasterLanguages.list,
		exclude_languages: brandAwarenessData.targeting.broadcasterLanguages.exclude,
		countries: brandAwarenessData.targeting.countries.list,
		exclude_countries: brandAwarenessData.targeting.countries.exclude,
		countries_auditory: brandAwarenessData.targeting.countriesAuditory.list,
		exclude_countries_auditory: brandAwarenessData.targeting.countriesAuditory.exclude,
		devices_auditory: brandAwarenessData.targeting.devicesAuditory.list,
		exclude_devices_auditory: brandAwarenessData.targeting.devicesAuditory.exclude,
		age_from: brandAwarenessData.targeting.age.from ?? null,
		age_to: brandAwarenessData.targeting.age.to ?? null,
		gender: brandAwarenessData.targeting.gender ?? null,
		mature: brandAwarenessData.targeting.mature,
		tags: brandAwarenessData.targeting.tags.list,
		exclude_tags: brandAwarenessData.targeting.tags.exclude,
		agencies: brandAwarenessData.targeting.agencies,
		min_cpm: null,
		max_cpm: null,
	}
}