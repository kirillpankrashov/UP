import type { IStreamerAdset, IStreamerAdsetResponse } from './types'

export const responseToData = (response: IStreamerAdsetResponse[]): IStreamerAdset[] => {
	return response.map(campaign => ({
		id: campaign.id,
		title: campaign.title,
		campaign: campaign.campaign,
		format: campaign.format,
		revenue: campaign.revenue,
		impressions: campaign.impressions,
		totalCtr: campaign.total_ctr,
		todayCtr: campaign.today_ctr,
		status: campaign.status,
		restore: campaign.restore,
		slug: campaign.slug,
	}))
}
