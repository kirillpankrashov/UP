import { AdFormat, AdsetStatus, CampaignType, Platform } from '@/core/types'

import type { IPrerollAdsetShort } from '../types'

export const prerollAdsetShort: IPrerollAdsetShort = {
	campaignType: CampaignType.PREROLL,
	id: 25,
	slug: 'PF-GRP-1697875677',
	title: 'Cupidatat non anim sit dolorem tempore ullamco qui',
	format: AdFormat.INTERACTIVE,
	platform: Platform.YOUTUBE,
	logo: 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com/holdings/d2c1dc71-45ee-4acf-8c40-6ee39e909d74',
	status: AdsetStatus.ACTIVE,
}
