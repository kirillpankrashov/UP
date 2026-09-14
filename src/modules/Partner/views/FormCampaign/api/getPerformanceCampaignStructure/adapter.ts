import { CampaignType } from '@/core/types'

import type {
	IPerformanceCampaignStructure,
	IPerformanceCampaignStructureResponse,
} from './types'

export const responseToData = (response: IPerformanceCampaignStructureResponse): IPerformanceCampaignStructure => {
	return {
		id: response.id,
		slug: response.slug,
		campaignType: CampaignType.PERFORMANCE,
		title: response.title,
		description: response.description,
		category: response.category,
		holding: response.holding,
		advertiser: {
			...response.advertiser,
			wallet: {
				...response.advertiser.wallet,
				currency: {
					...response.advertiser.wallet.currency,
					code: response.advertiser.wallet.currency.code,
					enTitle: response.advertiser.wallet.currency.en_title,
					ruTitle: response.advertiser.wallet.currency.ru_title,
					flag: response.advertiser.wallet.currency.flag,
					visible: response.advertiser.wallet.currency.visible,
					ptTitle: response.advertiser.wallet.currency.pt_title,
					esTitle: response.advertiser.wallet.currency.es_title,
				},
			},
		},
		adSets: response.ad_sets.map((adSet) => ({
			...adSet,
			campaign: adSet.campaign,
		})),
		visible: response.visible,
	}
}