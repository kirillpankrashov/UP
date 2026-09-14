import { CampaignType } from '@/core/types'

import type {
	ISpecialProjectAdset,
	ISpecialProjectAdsetResponse,
} from './types'

export const responseToData = (response: ISpecialProjectAdsetResponse): ISpecialProjectAdset => {
	return {
		id: response.id,
		format: {
			id: response.format.id,
			title: response.format.title,
			description: response.format.description,
			icon: response.format.icon,
		},
		duration: response.duration,
		frequency: response.frequency,
		formatEdit: response.format_edit,
		platform: response.platform,
		campaign: {
			id: response.campaign.id,
			slug: response.campaign.slug,
			type: CampaignType.SPECIAL_PROJECT,
			title: response.campaign.title,
			description: response.campaign.description,
			category: response.campaign.category,
			visible: response.campaign.visible,
		},
		slug: response.slug,
		title: response.title,
		titleAlternative: response.title_alternative,
		description: response.description,
		start: response.start,
		end: response.end,
		strategyPayment: response.strategy_payment,
		currency: {
			code: response.currency.code,
			enTitle: response.currency.en_title,
			ruTitle: response.currency.ru_title,
			flag: response.currency.flag,
			visible: response.currency.visible,
			ptTitle: response.currency.pt_title,
			esTitle: response.currency.es_title,
		},
		bidCap: response.bid_cap,
		timeZone: response.time_zone,
		targeting: {
			countriesAuditory: {
				list: response.targeting.countries_auditory,
				exclude: response.targeting.exclude_countries_auditory,
			},
			devicesAuditory: {
				list: response.targeting.devices_auditory,
				exclude: response.targeting.exclude_devices_auditory,
			},
			streamers: response.targeting.streamers.map(streamer => ({
				id: streamer.id,
				price: streamer.price,
			})),
		},
		published: response.published,
		visible: response.visible,
		priority: response.priority,
	}
}
