import { CampaignType } from '@/core/types'

import type {
	IExtensionAdset,
	IExtensionAdsetResponse,
} from './types'

export const responseToData = (response: IExtensionAdsetResponse): IExtensionAdset => {
	return {
		id: response.id,
		format: {
			id: response.format.id,
			title: response.format.title,
			description: response.format.description,
			icon: response.format.icon,
		},
		formatEdit: response.format_edit,
		platform: response.platform,
		campaign: {
			id: response.campaign.id,
			slug: response.campaign.slug,
			type: CampaignType.EXTENSION,
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
		impressions: response.impressions,
		clicks: response.clicks,
		targetCtr: response.target_ctr,
		targeting: {
			gender: response.targeting.gender,
			mature: response.targeting.mature,
			age: {
				from: response.targeting.age_from,
				to: response.targeting.age_to,
			},
			tags: {
				list: response.targeting.tags,
				exclude: response.targeting.exclude_tags,
			},
			countries: {
				list: response.targeting.countries,
				exclude: response.targeting.exclude_countries,
			},
			countriesAuditory: {
				list: response.targeting.countries_auditory,
				exclude: response.targeting.exclude_countries_auditory,
			},
			devicesAuditory: {
				list: response.targeting.devices_auditory,
				exclude: response.targeting.exclude_devices_auditory,
			},
			broadcasterLanguages: {
				list: response.targeting.broadcaster_languages,
				exclude: response.targeting.exclude_languages,
			},
			agencies: response.targeting.agencies,
			streamers: {
				exclude: response.targeting.exclude_streamers,
				list: response.targeting.streamers.map(streamer => ({
					id: streamer.id,
					name: streamer.name,
					currency: streamer.currency ?? null,
					agency: streamer.agency ? {
						id: streamer.agency.id,
						title: streamer.agency.title,
						currency: streamer.agency.currency,
						useDarkMarketCpm: streamer.agency.use_dark_market_cpm,
						cpm: streamer.agency.cpm ? {
							internalCpa: streamer.agency.cpm.internal_cpa,
							internalCpc: streamer.agency.cpm.internal_cpc,
							internalCpm: streamer.agency.cpm.internal_cpm,
							externalCpa: streamer.agency.cpm.external_cpa,
							externalCpc: streamer.agency.cpm.external_cpc,
							externalCpm: streamer.agency.cpm.external_cpm,
							darkMarketInternalCpa: streamer.agency.cpm.dark_market_internal_cpa,
							darkMarketInternalCpc: streamer.agency.cpm.dark_market_internal_cpc,
							darkMarketInternalCpm: streamer.agency.cpm.dark_market_internal_cpm,
							darkMarketExternalCpa: streamer.agency.cpm.dark_market_external_cpa,
							darkMarketExternalCpc: streamer.agency.cpm.dark_market_external_cpc,
							darkMarketExternalCpm: streamer.agency.cpm.dark_market_external_cpm,
						} : null,
					} : null,
					cpm: streamer.cpm ? {
						internalCpa: streamer.cpm.internal_cpa,
						internalCpc: streamer.cpm.internal_cpc,
						internalCpm: streamer.cpm.internal_cpm,
						externalCpa: streamer.cpm.external_cpa,
						externalCpc: streamer.cpm.external_cpc,
						externalCpm: streamer.cpm.external_cpm,
						darkMarketInternalCpa: streamer.cpm.dark_market_internal_cpa,
						darkMarketInternalCpc: streamer.cpm.dark_market_internal_cpc,
						darkMarketInternalCpm: streamer.cpm.dark_market_internal_cpm,
						darkMarketExternalCpa: streamer.cpm.dark_market_external_cpa,
						darkMarketExternalCpc: streamer.cpm.dark_market_external_cpc,
						darkMarketExternalCpm: streamer.cpm.dark_market_external_cpm,
					} : null,
				})),
			},
		},
		published: response.published,
		visible: response.visible,
		priority: response.priority,
	}
}
