import type { CampaignType } from '@/core/types'
import type { IStatus } from '@/core/types/response'
import { Api } from '@/core/client'

export const verifyAttachment = (campaignType: CampaignType, data: { format: string; unit: string }): Promise<IStatus> => {
	return Api.post<IStatus>(`partner/campaigns/${campaignType}/ad/attach/verify`, data, {
		cache: {
			update: {
				'partner-brand-awareness-creative-info': { type: 'deletePrefix', value: 'partner-brand-awareness-creative-info' },
				'partner-extension-creative-info': { type: 'deletePrefix', value: 'partner-extension-creative-info' },
				'partner-special-project-creative-info': { type: 'deletePrefix', value: 'partner-special-project-creative-info' },
			},
		},
	})
}
