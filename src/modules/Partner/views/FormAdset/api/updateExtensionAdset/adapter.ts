import type {
	IUpdateExtensionAdsetData,
	IUpdateExtensionAdsetPayload,
} from './types'

export const dataToPayload = (data: IUpdateExtensionAdsetData): IUpdateExtensionAdsetPayload => {
	return {
		slug: data.slug,
		title: data.title.default,
		title_alternative: data.title.alternative ?? null,
		description: data.description,
		platform: data.platform,
		format: data.format,
		strategy_payment: data.strategyPayment,
		bid_cap: data.bidCap ?? null,
		impressions: data.impressions ?? null,
		gender: data.targeting.gender ?? null,
		age_from: data.targeting.age.from ?? null,
		age_to: data.targeting.age.to ?? null,
		mature: data.targeting.mature,
		tags: data.targeting.tags.list,
		exclude_tags: data.targeting.tags.exclude,
		exclude_countries: data.targeting.countries.exclude,
		countries: data.targeting.countries.list,
		exclude_countries_auditory: data.targeting.countriesAuditory.exclude,
		countries_auditory: data.targeting.countriesAuditory.list,
		exclude_devices_auditory: data.targeting.devicesAuditory.exclude,
		devices_auditory: data.targeting.devicesAuditory.list,
		exclude_languages: data.targeting.broadcasterLanguages.exclude,
		broadcaster_languages: data.targeting.broadcasterLanguages.list,
		target_ctr: data.targetCtr ?? null,
		agencies: data.targeting.agencies,
		streamers: data.targeting.streamers.list,
		exclude_streamers: data.targeting.streamers.exclude,
		start: data.dates.start ?? '',
		end: data.dates.end ?? '',
	}
}
