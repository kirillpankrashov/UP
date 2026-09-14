import type { RouteLocationNamedRaw } from 'vue-router'

import { AdEntityType } from '@/core/types'
import { parseSlug } from '@/core/helpers'
import { RouteName } from '@/modules/Partner/router'
import type { AdEntity, AdEntityAdset, AdEntityCampaign, AdEntityCreative } from '@/modules/Partner/views/Campaigns/types'

export const getRouterLink = (row: AdEntity): RouteLocationNamedRaw => {
	const { adEntityType } = parseSlug(row.slug)

	switch(adEntityType) {
		case AdEntityType.CAMPAIGNS:
			return {
				name: RouteName.CAMPAIGN_EDIT,
				params: { campaignSlug: (row as AdEntityCampaign).slug },
			}
		case AdEntityType.ADSETS:
			return {
				name: RouteName.ADSET_EDIT,
				params: {
					campaignSlug: (row as AdEntityAdset).campaign.slug,
					adsetSlug: (row as AdEntityAdset).slug,
				},
			}
		case AdEntityType.CREATIVES:
			return {
				name: RouteName.CREATIVE_EDIT,
				params: {
					campaignSlug: (row as AdEntityCreative).adSet.campaign.slug,
					adsetSlug: (row as AdEntityCreative).adSet.slug,
					creativeSlug: (row as AdEntityCreative).slug,
				},
			}
	}
}
