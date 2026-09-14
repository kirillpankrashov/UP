import type { IPaginatedData, IResponsePaginatedData } from '@/core/types/response'

import type { IAdset, IAdsetResponse } from '../getAdsetsActive/types'

export const responseToData = (response: IResponsePaginatedData<IAdsetResponse[]>): IPaginatedData<IAdset[]> => ({
	status: response.status,
	total: response.total,
	perPage: response.per_page,
	data: response.data.map(adset => ({
		id: adset.id,
		slug: adset.slug,
		title: adset.title,
		description: adset.description,
		campaignType: adset.campaign.type,
		campaign: {
			id: adset.campaign.id,
			slug: adset.campaign.slug,
			type: adset.campaign.type,
			title: adset.campaign.title,
			description: adset.campaign.description,
			category: adset.campaign.category,
			visible: adset.campaign.visible,
		},
		dates: {
			start: adset.start,
			end: adset.end,
		},
		impressions: {
			total: adset.total_impressions,
		},
		streamers: adset.streamers ?? null,
		published: adset.published,
		visible: adset.visible,
		logo: adset.logo || '',
		format: adset.format,
		dailyActionLimit: adset.daily_action_limit
			? {
				enabled: adset.daily_action_limit.enabled,
				today: adset.daily_action_limit.today,
				limit: adset.daily_action_limit.today_limit,
			}
			: undefined,
		status: 'closed',
	})),
})
