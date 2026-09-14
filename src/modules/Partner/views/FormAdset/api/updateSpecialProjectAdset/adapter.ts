import type {
	IUpdateSpecialProjectAdsetData,
	IUpdateSpecialProjectAdsetPayload,
} from './types'

export const dataToPayload = (data: IUpdateSpecialProjectAdsetData): IUpdateSpecialProjectAdsetPayload => {
	return {
		slug: data.slug,
		title: data.title.default,
		title_alternative: data.title.alternative ?? null,
		description: data.description,
		platform: data.platform,
		format: data.format,
		duration: data.duration ?? null,
		frequency: data.frequency ?? null,
		strategy_payment: data.strategyPayment,
		bid_cap: data.bidCap ?? null,
		exclude_countries_auditory: data.targeting.countriesAuditory.exclude,
		countries_auditory: data.targeting.countriesAuditory.list,
		exclude_devices_auditory: data.targeting.devicesAuditory.exclude,
		devices_auditory: data.targeting.devicesAuditory.list,
		time_zone: data.timeZone ?? null,
		streamers: data.targeting.streamers.map(streamer => ({
			id: streamer.id,
			price: streamer.price,
		})),
		start: data.dates.start ?? '',
		end: data.dates.end ?? '',
	}
}
