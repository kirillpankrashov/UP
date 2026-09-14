import { AdFormat, AdsetStatus, CampaignType, CurrencyName, Platform } from '@/core/types'

import type { IExtensionAdset } from '../types'

export const extensionAdset: IExtensionAdset = {
	id: 368,
	slug: 'EXT-GRP-1703224119',
	title: 'Third-party Agency for Good Sun Talents',
	format: {
		id: AdFormat.EXT_BANNER,
		title: 'Баннер',
		description: 'Баннер',
		icon: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/formats/c518fb13-ed78-496a-9795-cf9c8aea8f18',
	},
	platform: Platform.TWITCH,
	description: 'Yo!',
	logo: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/holdings/d2c1dc71-45ee-4acf-8c40-6ee39e909d74',
	impressions: 0,
	clicks: 0,
	actions: 0,
	income: 0,
	campaignType: CampaignType.EXTENSION,
	dates: {
		start: '12.12.2023',
		end: '13.12.2024',
	},
	blocked: {
		at: null,
		until: null,
		reason: null,
	},
	currency: CurrencyName.USD,
	ctr: 0,
	status: AdsetStatus.ACTIVE,
	restore: true,
	adsetReady: false,
	ready: true,
}
