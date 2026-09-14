import { AdEntityType,CampaignType } from '@/core/types'
import type { IResponseMessage } from '@/core/types/response'
import { Api } from '@/core/client'

export const toggleStatus = (campaignType: CampaignType, adEntityType: AdEntityType, slug: string) => {
	const route = new Map()

	route.set(`${CampaignType.BRAND_AWARENESS}:${AdEntityType.CAMPAIGNS}`, 'partner/campaigns/brand_awareness/status')
	route.set(`${CampaignType.BRAND_AWARENESS}:${AdEntityType.ADSETS}`, 'partner/campaigns/brand_awareness/ad-set/status')
	route.set(`${CampaignType.BRAND_AWARENESS}:${AdEntityType.CREATIVES}`, 'partner/campaigns/brand_awareness/ad/status')

	route.set(`${CampaignType.PERFORMANCE}:${AdEntityType.CAMPAIGNS}`, 'partner/campaigns/performance/status')
	route.set(`${CampaignType.PERFORMANCE}:${AdEntityType.ADSETS}`, 'partner/campaigns/performance/ad-set/status')

	route.set(`${CampaignType.PREROLL}:${AdEntityType.CAMPAIGNS}`, 'partner/campaigns/preroll/status')
	route.set(`${CampaignType.PREROLL}:${AdEntityType.ADSETS}`, 'partner/campaigns/preroll/ad-set/status')

	route.set(`${CampaignType.EXTENSION}:${AdEntityType.CAMPAIGNS}`, 'partner/campaigns/extension/status')
	route.set(`${CampaignType.EXTENSION}:${AdEntityType.ADSETS}`, 'partner/campaigns/extension/ad-set/status')
	route.set(`${CampaignType.EXTENSION}:${AdEntityType.CREATIVES}`, 'partner/campaigns/extension/ad/status')

	route.set(`${CampaignType.SPECIAL_PROJECT}:${AdEntityType.CAMPAIGNS}`, 'partner/campaigns/special_project/status')
	route.set(`${CampaignType.SPECIAL_PROJECT}:${AdEntityType.ADSETS}`, 'partner/campaigns/special_project/ad-set/status')
	route.set(`${CampaignType.SPECIAL_PROJECT}:${AdEntityType.CREATIVES}`, 'partner/campaigns/special_project/ad/status')

	const cacheUpdate: Record<string, { type: 'deletePrefix'; value: string }> = {}

	switch (campaignType) {
		case CampaignType.BRAND_AWARENESS:
			if (adEntityType === AdEntityType.CAMPAIGNS) {
				cacheUpdate['partner-brand-awareness-campaigns'] = { type: 'deletePrefix', value: 'partner-brand-awareness-campaigns' }
				cacheUpdate['partner-brand-awareness-campaign-info'] = { type: 'deletePrefix', value: 'partner-brand-awareness-campaign-info' }
			}
			if (adEntityType === AdEntityType.ADSETS) {
				cacheUpdate['partner-brand-awareness-adsets'] = { type: 'deletePrefix', value: 'partner-brand-awareness-adsets' }
				cacheUpdate['partner-brand-awareness-adset-info'] = { type: 'deletePrefix', value: 'partner-brand-awareness-adset-info' }
			}
			if (adEntityType === AdEntityType.CREATIVES) {
				cacheUpdate['partner-brand-awareness-creatives'] = { type: 'deletePrefix', value: 'partner-brand-awareness-creatives' }
				cacheUpdate['partner-brand-awareness-creative-info'] = { type: 'deletePrefix', value: 'partner-brand-awareness-creative-info' }
			}
			break
		case CampaignType.PERFORMANCE:
			if (adEntityType === AdEntityType.CAMPAIGNS) {
				cacheUpdate['partner-performance-campaigns'] = { type: 'deletePrefix', value: 'partner-performance-campaigns' }
				cacheUpdate['partner-performance-campaign-info'] = { type: 'deletePrefix', value: 'partner-performance-campaign-info' }
			}
			if (adEntityType === AdEntityType.ADSETS) {
				cacheUpdate['partner-performance-adsets'] = { type: 'deletePrefix', value: 'partner-performance-adsets' }
				cacheUpdate['partner-performance-adset-info'] = { type: 'deletePrefix', value: 'partner-performance-adset-info' }
			}
			break
		case CampaignType.PREROLL:
			if (adEntityType === AdEntityType.CAMPAIGNS) {
				cacheUpdate['partner-preroll-campaigns'] = { type: 'deletePrefix', value: 'partner-preroll-campaigns' }
				cacheUpdate['partner-preroll-campaign-info'] = { type: 'deletePrefix', value: 'partner-preroll-campaign-info' }
			}
			if (adEntityType === AdEntityType.ADSETS) {
				cacheUpdate['partner-preroll-adsets'] = { type: 'deletePrefix', value: 'partner-preroll-adsets' }
				cacheUpdate['partner-preroll-adset-info'] = { type: 'deletePrefix', value: 'partner-preroll-adset-info' }
			}
			break
		case CampaignType.EXTENSION:
			if (adEntityType === AdEntityType.CAMPAIGNS) {
				cacheUpdate['partner-extension-campaigns'] = { type: 'deletePrefix', value: 'partner-extension-campaigns' }
				cacheUpdate['partner-extension-campaign-info'] = { type: 'deletePrefix', value: 'partner-extension-campaign-info' }
			}
			if (adEntityType === AdEntityType.ADSETS) {
				cacheUpdate['partner-extension-adsets'] = { type: 'deletePrefix', value: 'partner-extension-adsets' }
				cacheUpdate['partner-extension-adset-info'] = { type: 'deletePrefix', value: 'partner-extension-adset-info' }
			}
			if (adEntityType === AdEntityType.CREATIVES) {
				cacheUpdate['partner-extension-creatives'] = { type: 'deletePrefix', value: 'partner-extension-creatives' }
				cacheUpdate['partner-extension-creative-info'] = { type: 'deletePrefix', value: 'partner-extension-creative-info' }
			}
			break
		case CampaignType.SPECIAL_PROJECT:
			if (adEntityType === AdEntityType.CAMPAIGNS) {
				cacheUpdate['partner-special-project-campaigns'] = { type: 'deletePrefix', value: 'partner-special-project-campaigns' }
				cacheUpdate['partner-special-project-campaign-info'] = { type: 'deletePrefix', value: 'partner-special-project-campaign-info' }
			}
			break
		case CampaignType.SPECIAL_PROJECT:
			if (adEntityType === AdEntityType.ADSETS) {
				cacheUpdate['partner-special-project-adsets'] = { type: 'deletePrefix', value: 'partner-special-project-adsets' }
				cacheUpdate['partner-special-project-adset-info'] = { type: 'deletePrefix', value: 'partner-special-project-adset-info' }
			}
			if (adEntityType === AdEntityType.CREATIVES) {
				cacheUpdate['partner-special-project-creatives'] = { type: 'deletePrefix', value: 'partner-special-project-creatives' }
				cacheUpdate['partner-special-project-creative-info'] = { type: 'deletePrefix', value: 'partner-special-project-creative-info' }
			}
			break
		default:
			break
	}

	return Api.post<IResponseMessage>(route.get(`${campaignType}:${adEntityType}`), { slug }, {
		cache: {
			update: cacheUpdate,
		},
	})
}
