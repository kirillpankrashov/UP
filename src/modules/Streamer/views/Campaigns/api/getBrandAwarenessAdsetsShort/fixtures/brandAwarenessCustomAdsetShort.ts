import { AdFormat, AdsetStatus, CampaignType, Platform } from '@/core/types'

import type { IBrandAwarenessAdsetShort } from '../types'

export const brandAwarenessCustomAdsetShort: IBrandAwarenessAdsetShort = {
	id: 368,
	slug: 'BA-GRP-1703224119',
	title: 'Third-party Agency for Good Sun Talents',
	format: AdFormat.CUSTOM,
	platform: Platform.TWITCH,
	logo: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/holdings/d2c1dc71-45ee-4acf-8c40-6ee39e909d74',
	campaignType: CampaignType.BRAND_AWARENESS,
	status: AdsetStatus.ACTIVE,
}
