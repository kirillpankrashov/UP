import { AdFormat, type TCPMFormatsData, type TCPMFormatsResponse, type TPlatformInfoData, type TPlatformInfoResponse, type TStreamer, type TStreamerResponse } from '@/core/types'

export const responseToData = (response: TStreamerResponse): TStreamer => {
	const { birthday, country, email, gender, language, name } = response.user
	const isFilled = Boolean(birthday && country && email && gender && language)

	const username = response.twitch?.nickname || response.trovo?.nickname || response.youtube?.nickname || name

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

	const _formatPlatform = (platform: TPlatformInfoResponse | null): TPlatformInfoData | null => {
		if (!platform) {
			return null
		}

		return {
			avatar: platform.avatar,
			displayname: platform.displayname,
			nickname: platform.nickname,
			providerId: platform.provider_id,
			application: platform.application ? {
				accessToken: platform.application.access_token,
				clientId: platform.application.client_id,
			} : undefined,
		}
	}

	return {
		userId: response.user.user_id,
		name: response.user.name,
		email: response.user.email,
		locale: response.user.locale,
		language: response.user.language,
		country: response.user.country,
		gender: response.user.gender,
		balance: response.user.balance,
		currency: response.user.currency,
		birthday: response.user.birthday,
		referral: response.user.referral,
		emailVerified: response.user.email_verified,
		signedUp: response.user.signed_up,
		userHash: response.user.user_hash,
		domain: response.user.domain,
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
		freemiumActive: response.user.freemium_active,
		deleted: {
			isDeleted: response.user.deleted,
			isRequested: response.user.deleted_request,
			daysLeft: response.user.deleted_left_days,
		},
		loyaltyProgram: {
			level: response.tier.name,
		},
		platforms: {
			twitch: _formatPlatform(response.twitch),
			youtube: _formatPlatform(response.youtube),
			trovo: _formatPlatform(response.trovo),
			vkplay: _formatPlatform(response.vkplay),
			tiktok: _formatPlatform(response.tiktok),
			discord: _formatPlatform(response.discord),
		},
		isFilled,
		username,
		youtubeTextActive: response.user.youtube_text_active,
		prerollActive: response.user.vod_active,
		specialProjectsActive: response.user.special_projects_active,
	}
}
