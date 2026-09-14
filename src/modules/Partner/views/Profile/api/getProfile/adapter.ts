import { AdFormat, type TCPMFormatsData, type TCPMFormatsResponse, type TPartner, type TPartnerResponse } from '@/core/types'

export const responseToData = (response: TPartnerResponse): TPartner => {
	const _formatCPM = (cpm: TCPMFormatsResponse | null): TCPMFormatsData => {
		return {
			[AdFormat.FULLSCREEN]: cpm?.video || null,
			[AdFormat.PIP]: cpm?.pip_video || null,
			[AdFormat.CUSTOM]: cpm?.custom || null,
			[AdFormat.INTERACTIVE]: cpm?.interactive || null,
			[AdFormat.ADMNG]: cpm?.admngr || null,
			[AdFormat.CHATBOT_TEXT]: cpm?.chatbot_text || null,
			[AdFormat.PREROLL]: cpm?.preroll || null,
			[AdFormat.YANDEX_FS]: cpm?.yandex_fs || null,
			[AdFormat.YANDEX_PF]: cpm?.yandex_pf || null,
			[AdFormat.YANDEX_TEXT]: cpm?.yandex_text || null,
			[AdFormat.YOUTUBE_TEXT]: cpm?.youtube_text || null,
			[AdFormat.LEADERBOARD]: cpm?.leaderboard || null,
			[AdFormat.CPMSTAR_BANNER]: cpm?.cpmstar_banner || null,
			[AdFormat.EXT_QUIZ]: cpm?.ext_quiz || null,
			[AdFormat.EXT_BANNER]: cpm?.ext_banner || null,
			[AdFormat.EXT_GALLERY]: cpm?.ext_gallery || null,
			[AdFormat.SP_CUSTOM]: cpm?.sp_custom || null,
			[AdFormat.SP_FULLSCREEN]: cpm?.sp_fullscreen || null,
		}
	}

	return {
		userId: response.user.user_id,
		username: response.user.name,
		email: response.user.email,
		locale: response.user.locale,
		balance: response.user.balance,
		currency: response.user.currency,
		emailVerified: response.user.email_verified,
		signedUp: response.user.signed_up,
		userHash: response.user.user_hash,
		domain: response.user.domain,
		company: response.user.company,
		phone: response.user.phone,
		roleExtended: response.user.role_extended,
		agency: {
			id: response.user.agency.id,
			title: response.user.agency.title,
			description: response.user.agency.description,
			streamersParticipate: response.user.agency.streamers_participate,
			useDarkMarket: response.user.agency.use_dark_market,
			commission: response.user.agency.commission,
			ignoreCategories: response.user.agency.ignore_categories,
			cpm: {
				internalCpa: response.user.agency.cost_per_mille.internal_cpa,
				internalCpc: response.user.agency.cost_per_mille.internal_cpc,
				internalCpm: _formatCPM(response.user.agency.cost_per_mille.internal_cpm),
				externalCpa: response.user.agency.cost_per_mille.external_cpa,
				externalCpc: response.user.agency.cost_per_mille.external_cpc,
				externalCpm: _formatCPM(response.user.agency.cost_per_mille.external_cpm),
				darkMarketInternalCpa: response.user.agency.cost_per_mille.dark_market_internal_cpa,
				darkMarketInternalCpc: response.user.agency.cost_per_mille.dark_market_internal_cpc,
				darkMarketInternalCpm: _formatCPM(response.user.agency.cost_per_mille.dark_market_internal_cpm),
				darkMarketExternalCpa: response.user.agency.cost_per_mille.dark_market_external_cpa,
				darkMarketExternalCpc: response.user.agency.cost_per_mille.dark_market_external_cpc,
				darkMarketExternalCpm: _formatCPM(response.user.agency.cost_per_mille.dark_market_external_cpm),
			},
			currency: response.user.agency.currency,
		},
		debugActive: response.user.debug_active,
	}
}
