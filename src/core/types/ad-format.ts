export enum AdFormat {
	ADMNG = 'admngr',
  FULLSCREEN = 'video',
  LEADERBOARD = 'leaderboard',
  PIP = 'pip_video',
  CUSTOM = 'custom',
  INTERACTIVE = 'interactive',
  CHATBOT_TEXT = 'chatbot_text',
  YANDEX_FS = 'yandex_fs',
  YANDEX_PF = 'yandex_pf',
  YANDEX_TEXT = 'yandex_text',
	YOUTUBE_TEXT = 'youtube_text',
	PREROLL = 'preroll',
  CPMSTAR_BANNER = 'cpmstar_banner',
	EXT_QUIZ = 'ext_quiz',
	EXT_BANNER = 'ext_banner',
	EXT_GALLERY = 'ext_gallery',
  SP_FULLSCREEN = 'sp_fullscreen',
  SP_CUSTOM = 'sp_custom',
}

export interface IAdFormat {
	id: AdFormat
	title: string
	description: string
	icon: string
}
