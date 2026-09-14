import { Platform } from '@/core/types'

import type { ITargetingStreamerSearch, ITargetingStreamerSearchData, ITargetingStreamerSearchPayload, ITargetingStreamerSearchResponse } from './types'

export const dataToPayload = (data: ITargetingStreamerSearchData): ITargetingStreamerSearchPayload => {
	return {
		q: data.query,
		a: data.agencies || [],
		format: data.format,
		min_cpm: data.minCpm,
		max_cpm: data.maxCpm,
		dark_market: data.darkMarket ? 1 : 0,
		category: data.category || null,
	}
}

export const responseToData = (platform: Platform, response: ITargetingStreamerSearchResponse[]): ITargetingStreamerSearch[] => {
	return response.map(item => ({
		id: item.id,
		name: item.name,
		currency: item.currency || null,
		agency: item.agency ? {
			...item.agency,
			useDarkMarketCpm: item.agency.use_dark_market_cpm,
			cpm: item.agency.cpm ? {
				...item.agency.cpm,
				internalCpa: item.agency.cpm.internal_cpa || null,
				internalCpc: item.agency.cpm.internal_cpc || null,
				internalCpm: item.agency.cpm.internal_cpm || null,
				externalCpa: item.agency.cpm.external_cpa || null,
				externalCpc: item.agency.cpm.external_cpc || null,
				externalCpm: item.agency.cpm.external_cpm || null,
				darkMarketInternalCpa: item.agency.cpm.dark_market_internal_cpa || null,
				darkMarketInternalCpc: item.agency.cpm.dark_market_internal_cpc || null,
				darkMarketInternalCpm: item.agency.cpm.dark_market_internal_cpm || null,
				darkMarketExternalCpa: item.agency.cpm.dark_market_external_cpa || null,
				darkMarketExternalCpc: item.agency.cpm.dark_market_external_cpc || null,
				darkMarketExternalCpm: item.agency.cpm.dark_market_external_cpm || null,
			} : null,
		} : null,
		cpm: item.cpm ? {
			...item.cpm,
			internalCpa: item.cpm.internal_cpa || null,
			internalCpc: item.cpm.internal_cpc || null,
			internalCpm: item.cpm.internal_cpm || null,
			externalCpa: item.cpm.external_cpa || null,
			externalCpc: item.cpm.external_cpc || null,
			externalCpm: item.cpm.external_cpm || null,
			darkMarketInternalCpa: item.cpm.dark_market_internal_cpa || null,
			darkMarketInternalCpc: item.cpm.dark_market_internal_cpc || null,
			darkMarketInternalCpm: item.cpm.dark_market_internal_cpm || null,
			darkMarketExternalCpa: item.cpm.dark_market_external_cpa || null,
			darkMarketExternalCpc: item.cpm.dark_market_external_cpc || null,
			darkMarketExternalCpm: item.cpm.dark_market_external_cpm || null,
		} : null,
		platform: {
			name: platform,
			avatar: item[platform]?.avatar || '',
			nickname: item[platform]?.nickname || '',
			displayname: item[platform]?.displayname || '',
		},
		widget: item.widget ? {
			slug: item.widget.slug,
		} : null,
	}))
}
