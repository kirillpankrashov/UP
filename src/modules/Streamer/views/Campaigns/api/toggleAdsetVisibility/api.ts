import type { CampaignType, IResponseMessage } from '@/core/types'
import { Api } from '@/core/client'

export const toggleAdsetVisibility = ({
	campaignType,
	slug,
	visible,
}: {
	campaignType: CampaignType
	slug: string
	visible: boolean
}) => {
	return Api.post<IResponseMessage>(`streamer/campaigns/${campaignType}/status`, { slug, visible }, {
		cache: {
			update: {
				'streamer-brand-awareness-adsets': { type: 'deletePrefix', value: 'streamer-brand-awareness-adsets' },
				'streamer-extension-adsets': { type: 'deletePrefix', value: 'streamer-extension-adsets' },
				'streamer-performance-adsets': { type: 'deletePrefix', value: 'streamer-performance-adsets' },
				'streamer-preroll-adsets': { type: 'deletePrefix', value: 'streamer-preroll-adsets' },
				'streamer-special-project-adsets': { type: 'deletePrefix', value: 'streamer-special-project-adsets' },
			},
		},
	})
}
