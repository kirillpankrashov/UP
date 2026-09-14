import { CampaignType } from '@/core/types'

export const getCampaignTypeBySlug = (slug: string): CampaignType => {
	if (/^PF/.test(slug)) return CampaignType.PERFORMANCE
	if (/^SP/.test(slug)) return CampaignType.SPECIAL_PROJECT

	// defaul type
	return CampaignType.BRAND_AWARENESS
}
