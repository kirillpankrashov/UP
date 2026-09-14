import { type TCPMFormatsData } from '@/core/types'

import {
	type ICampaignsDictionary,
	type ICampaignsDictionaryResponse,
} from './types'

export const responseToData = (response: ICampaignsDictionaryResponse): ICampaignsDictionary => {
	const formatCpm = (cpm: TCPMFormatsData) => {
		return Object.entries(cpm).reduce((acc, [key, value]) => {
			acc[key as keyof TCPMFormatsData] = value ? +value : null
			return acc
		}, {} as TCPMFormatsData)
	}

	return {
		types: response.types.map((type) => ({
			id: type.id,
			title: type.title,
			description: type.description,
			icon: type.icon,
			visible: type.visible,
		})),
		platforms: response.platforms ?? [],
		formats: response.formats ?? [],
		frequency: response.frequency ?? [],
		frequencyPeriods: response.frequency_periods ?? [],
		affiliateNetworks: response.affiliate_networks?.map((network) => ({
			id: network.id,
			title: network.title,
			currency: {
				code: network.currency.code,
				enTitle: network.currency.en_title,
				ruTitle: network.currency.ru_title,
				ptTitle: network.currency.pt_title,
				esTitle: network.currency.es_title,
				flag: network.currency.flag,
				visible: network.currency.visible,
			},
		})) ?? [],
		strategyPaymentTypes: response.strategy_payment_types,
		gender: response.gender,
		holdings: response.holdings.map((holding) => ({
			id: holding.id,
			title: holding.title,
			description: holding.description ?? '',
			logo: holding.logo ?? '',
			advertisers: holding.advertisers.map((advertiser) => ({
				id: advertiser.id,
				title: advertiser.title,
			})),
		})),
		formatRequirements: response.format_requirements,
		agencies: response.agencies?.map((agency) => ({
			id: agency.id,
			title: agency.title,
			useDarkMarket: agency.use_dark_market,
			internalCpm: {
				min: formatCpm(agency.internal_cpm.min),
				max: formatCpm(agency.internal_cpm.max),
			},
			externalCpm: {
				min: formatCpm(agency.external_cpm.min),
				max: formatCpm(agency.external_cpm.max),
			},
			currency: agency.currency,
		})),
		agenciesPayableCpm: response.agencies_payable_cpm ? formatCpm(response.agencies_payable_cpm) : null,
		agenciesPayableCpc: response.agencies_payable_cpc ?? null,
		agenciesPayableCpa: response.agencies_payable_cpa ?? null,
		mediaAgencies: response.media_agencies?.map((mediaAgency) => ({
			id: mediaAgency.id,
			title: mediaAgency.title,
		})),
	}
}
