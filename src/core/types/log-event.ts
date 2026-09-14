import { CampaignType, type IAttachments, LogEvents } from '@/core/types'

import type { IDebugWidget } from '../../modules/Debug/types/debug-widget'

export interface ILogEventCampaign {
	dateTime: string
	event: LogEvents.FETCHED_CREATIVES | LogEvents.FETCHED_REFERRAL_CREATIVES | LogEvents.FETCHED_DEMO_CREATIVES
	payload: {
		status: boolean
		version: string | null
		data: [
			{
				id: number
				ad_set: {
					id: number
					slug: string
					format: string
					make_screenshots: boolean
					campaign: {
						id: number
						slug: string
						type: CampaignType
					}
					advertiser: {
						legal_name: string
						tin: string
					}
				}
				impression_slug: string
				slug: string
				attachments: IAttachments
				qr_code: boolean
				companion_cta: string
				qr_link: string
				pixel_impressions: string[]
				viewers_count: number
			}
		]
	}
}

export interface ILogEventWidget {
	dateTime: string
	event: LogEvents.UPDATE_WIDGET
	oldWidget: IDebugWidget
	payload: IDebugWidget
}

export interface ILogEventMessages {
	dateTime: string
	event: LogEvents
	payload: {
		status: boolean
		version: string | null
		messages: Array<{
			code: string
			field: string | null
			text: string
		}>
	}
}

export type ILogEvent = ILogEventCampaign | ILogEventWidget | ILogEventMessages
