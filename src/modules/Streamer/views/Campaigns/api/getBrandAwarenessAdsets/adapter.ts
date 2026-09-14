import { CampaignType } from '@/core/types'

import type { IBrandAwarenessAdset, IBrandAwarenessAdsetResponse, IBrandAwarenessAdsets, IBrandAwarenessAdsetsResponse } from './types'

export const responseToData = (response: IBrandAwarenessAdsetsResponse): IBrandAwarenessAdsets => {
	const adapter = (adset: IBrandAwarenessAdsetResponse): IBrandAwarenessAdset => {
		return {
			campaignType: CampaignType.BRAND_AWARENESS,
			id: adset.id,
			slug: adset.slug,
			title: adset.title,
			format: adset.format,
			platform: adset.platform,
			description: adset.description,
			logo: adset.logo,
			impressions: {
				current: adset.impressions,
				dailyLimit: adset.daily_limit,
				dailyLimitRest: adset.daily_limit_rest,
			},
			restLimitPercent: adset.rest_limit_percent,
			estimateIncome: adset.estimate_income,
			currency: {
				creator: adset.creator_payout_currency,
				adset: adset.currency,
			},
			ctr: adset.ctr,
			dates: {
				start: adset.start,
				end: adset.end,
			},
			time: {
				start: adset.start_time,
				end: adset.finish_time,
			},
			status: adset.status,
			restore: adset.restore,
			blocked: {
				at: adset.blocked_at,
				until: adset.blocked_until,
				reason: adset.blocked_reason,
			},
			dailyActionLimit: {
				enabled: adset.daily_action_limit.enabled,
				today: adset.daily_action_limit.today,
				limit: adset.daily_action_limit.today_limit,
			},
			strategyPayment: adset.strategy_payment,
			streamerDayLimit: adset.streamer_day_limit,
			streamerDayLimitShown: adset.streamer_day_limit_shown,
		}
	}

	return {
		active: response.active.map(adapter),
		inactive: response.inactive.map(adapter),
		future: response.future.map(adapter),
		unavailable: response.unavailable.map(adapter),
	}
}
