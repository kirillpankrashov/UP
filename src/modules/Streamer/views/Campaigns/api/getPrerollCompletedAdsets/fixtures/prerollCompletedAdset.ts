import { CampaignType, CurrencyName, Platform } from '@/core/types'

import type { IPrerollCompletedAdset } from '../types'

export const prerollCompletedAdset: IPrerollCompletedAdset = {
	campaignType: CampaignType.PREROLL,
	id: 368,
	slug: 'PF-GRP-1703224119',
	title: 'Third-party Agency for Good Sun Talents',
	description: 'Yo!',
	logo: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/holdings/d2c1dc71-45ee-4acf-8c40-6ee39e909d74',
	dates: {
		start: '12.12.2023',
		end: '13.12.2024',
	},
	status: 'close',
	currency: CurrencyName.USD,
	platform: Platform.YOUTUBE,
}
