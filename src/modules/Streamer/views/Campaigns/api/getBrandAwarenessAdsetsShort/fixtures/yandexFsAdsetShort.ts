import { AdFormat, AdsetStatus, CampaignType, Platform } from '@/core/types'

import type { IBrandAwarenessAdsetShort } from '../types'

export const yandexFsAdsetShort: IBrandAwarenessAdsetShort = {
	id: 368,
	slug: 'BA-GRP-1703224119',
	title: 'Внешние рекламные сети',
	format: AdFormat.YANDEX_FS,
	platform: Platform.TWITCH,
	logo: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/holdings/d2c1dc71-45ee-4acf-8c40-6ee39e909d74',
	status: AdsetStatus.ACTIVE,
	campaignType: CampaignType.BRAND_AWARENESS,
}
