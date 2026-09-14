import { AdFormat, CampaignType, CurrencyName, PayoutType, Platform, PrerollAdsetStatus } from '@/core/types'

import type { IPrerollAdset } from '../types'

export const prerollAdset: IPrerollAdset = {
	campaignType: CampaignType.PREROLL,
	id: 25,
	slug: 'VOD-GRP-1724970968',
	title: 'Cupidatat non anim sit dolorem tempore ullamco qui',
	format: {
		id: AdFormat.PREROLL,
		title: 'Preroll',
		description: '',
		icon: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/formats/interactive.svg',
	},
	platform: Platform.TWITCH,
	description: 'In sint id aliqua Provident natus laborum Vel incidunt amet ex in ut quae id laudantium',
	logo: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/holdings/d2c1dc71-45ee-4acf-8c40-6ee39e909d74',
	payableType: PayoutType.IMPRESSIONS,
	impressions: {
		campaign: 0,
		creator: 0,
	},
	creatorAvgViews: 0,
	earningsLimit: 0,
	clicks: 0,
	actions: 0,
	income: 0,
	currency: CurrencyName.USD,
	ctr: 0,
	dates: {
		start: '18.11.2023',
		end: '19.12.2024',
	},
	status: PrerollAdsetStatus.CONFIRMED,
}
