import type { CampaignType } from '@/core/types'
import type { IStatus } from '@/core/types/response'
import { Api } from '@/core/client'

export const deleteAttachment = (campaignType: CampaignType, data: { field: string; slug: string }): Promise<IStatus> => {
	return Api.post<IStatus>(`partner/campaigns/${campaignType}/ad-set/attach/delete`, data, {
		cache: {
			update: {
				'partner-brand-awareness-adset-info': { type: 'deletePrefix', value: 'partner-brand-awareness-adset-info' },
				'partner-extension-adset-info': { type: 'deletePrefix', value: 'partner-extension-adset-info' },
				'partner-special-project-adset-info': { type: 'deletePrefix', value: 'partner-special-project-adset-info' },
				'partner-preroll-adset-info': { type: 'deletePrefix', value: 'partner-preroll-adset-info' },
				'partner-performance-adset-info': { type: 'deletePrefix', value: 'partner-performance-adset-info' },
			},
		},
	})
}
