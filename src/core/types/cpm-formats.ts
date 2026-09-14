import { AdFormat } from '@/core/types'

export type TCPMFormatsResponse = {
	[AdFormat.FULLSCREEN]: number | null
	[AdFormat.PIP]: number | null
	[AdFormat.CUSTOM]: number | null
	[AdFormat.ADMNG]: number | null
	[AdFormat.YANDEX_FS]: number | null
	[AdFormat.YANDEX_PF]: number | null
	[AdFormat.YANDEX_TEXT]: number | null
	[AdFormat.YOUTUBE_TEXT]: number | null
	[AdFormat.CHATBOT_TEXT]: number | null
	[AdFormat.INTERACTIVE]: number | null
	[AdFormat.PREROLL]: number | null
	[AdFormat.LEADERBOARD]: number | null
	[AdFormat.CPMSTAR_BANNER]: number | null
	[AdFormat.EXT_QUIZ]: number | null
	[AdFormat.EXT_BANNER]: number | null
	[AdFormat.EXT_GALLERY]: number | null
  [AdFormat.SP_CUSTOM]: number | null
  [AdFormat.SP_FULLSCREEN]: number | null
}

export type TCPMFormatsData = {
	[AdFormat.FULLSCREEN]: number | null
	[AdFormat.PIP]: number | null
	[AdFormat.CUSTOM]: number | null
	[AdFormat.ADMNG]: number | null
	[AdFormat.YANDEX_FS]: number | null
	[AdFormat.YANDEX_PF]: number | null
	[AdFormat.YANDEX_TEXT]: number | null
	[AdFormat.YOUTUBE_TEXT]: number | null
	[AdFormat.CHATBOT_TEXT]: number | null
	[AdFormat.INTERACTIVE]: number | null
	[AdFormat.PREROLL]: number | null
	[AdFormat.LEADERBOARD]: number | null
	[AdFormat.CPMSTAR_BANNER]: number | null
	[AdFormat.EXT_QUIZ]: number | null
	[AdFormat.EXT_BANNER]: number | null
	[AdFormat.EXT_GALLERY]: number | null
  [AdFormat.SP_CUSTOM]: number | null
  [AdFormat.SP_FULLSCREEN]: number | null
}

export type TCPMResponse = {
	internal_cpa: number | null
	internal_cpc: number | null
	internal_cpm: TCPMFormatsResponse | null
	external_cpa: number | null
	external_cpc: number | null
	external_cpm: TCPMFormatsResponse | null
	dark_market_internal_cpa: number | null
	dark_market_internal_cpc: number | null
	dark_market_internal_cpm: TCPMFormatsResponse | null
	dark_market_external_cpa: number | null
	dark_market_external_cpc: number | null
	dark_market_external_cpm: TCPMFormatsResponse | null
}

export type TCPM = {
	internalCpa: number | null
	internalCpc: number | null
	internalCpm: TCPMFormatsData | null
	externalCpa: number | null
	externalCpc: number | null
	externalCpm: TCPMFormatsData | null
	darkMarketInternalCpa: number | null
	darkMarketInternalCpc: number | null
	darkMarketInternalCpm: TCPMFormatsData | null
	darkMarketExternalCpa: number | null
	darkMarketExternalCpc: number | null
	darkMarketExternalCpm: TCPMFormatsData | null
}
