import { AdFormat } from '@/core/types/ad-format'
import { AdsetStatus } from '@/core/types/adset-status'
import { CampaignType } from '@/core/types/campaign-type'
import type { IPaginatedData } from '@/core/types/response'
import type { IAdset } from '@/modules/Partner/views/Agency/api/getAdsetsActive/types'

export const adsetsActive: IPaginatedData<IAdset[]> = {
	status: true,
	total: 1,
	perPage: 1,
	data: [
		{
			campaignType: CampaignType.BRAND_AWARENESS,
			status: AdsetStatus.ACTIVE,
			'id': 886,
			'slug': 'BA-GRP-1714611367',
			'title': 'Promo of campaign for Little Caesars on Celebration Cup 2024',
			'description': '',
			'format': {
				'id': AdFormat.PIP,
				'title': 'Оверлей 15%',
				'description': 'Реклама mid-roll в прямой трансляции, размещенная на 15% видимой области.',
				'icon': 'https://uplify-storage.s3.eu-central-1.amazonaws.com/formats/e9683334-28bc-4101-ab42-bc735f5bd9dd.svg',
			},
			'campaign': {
				'id': 481,
				'slug': 'BA-CMP-1710829805',
				'type': CampaignType.BRAND_AWARENESS,
				'title': 'Mexico // Little Caesars // March-April 2024',
				'description': 'A campaign for Little Caesar on Celebration Cup 2024',
				'category': 'Еда & Рестораны',
				'visible': false,
			},
			'logo': '',
			'dates': {
				'start': '2024-04-23',
				'end': '2024-04-30',
			},
			'impressions': {
				'total': 6200,
			},
			'streamers': 0,
			'published': true,
			'dailyActionLimit': {
				'enabled': false,
				'today': 0,
				'limit': 0,
			},
			'visible': true,
		},
		{
			campaignType: CampaignType.BRAND_AWARENESS,
			status: AdsetStatus.ACTIVE,
			'id': 885,
			'slug': 'BA-GRP-1714209687',
			'title': 'Promo of campaign for Little Caesars on Celebration Cup 2024',
			'description': '',
			'format': {
				'id': AdFormat.PIP,
				'title': 'Оверлей 15%',
				'description': 'Реклама mid-roll в прямой трансляции, размещенная на 15% видимой области.',
				'icon': 'https://uplify-storage.s3.eu-central-1.amazonaws.com/formats/e9683334-28bc-4101-ab42-bc735f5bd9dd.svg',
			},
			'campaign': {
				'id': 481,
				'slug': 'BA-CMP-1710829805',
				'type': CampaignType.BRAND_AWARENESS,
				'title': 'Mexico // Little Caesars // March-April 2024',
				'description': 'A campaign for Little Caesar on Celebration Cup 2024',
				'category': 'Еда & Рестораны',
				'visible': false,
			},
			'logo': '',
			'dates': {
				'start': '2024-04-23',
				'end': '2024-04-30',
			},
			'impressions': {
				'total': 83000,
			},
			'streamers': 4,
			'published': true,
			'dailyActionLimit': {
				'enabled': false,
				'today': 0,
				'limit': 0,
			},
			'visible': true,
		},
	],
}
