declare global {
	type PopupOptions = {
		key?: string
		layout?: 'default' | 'modal'
		width?: number
		alignLeft?: boolean
		hideTitle?: true
		overlay?: boolean
		emoji?: {
			text: string
			animation: 'none' | 'wave' | 'tada' | 'heart-beat' | 'spin' | 'flash' | 'bounce' | 'rubber-band' | 'head-shake'
		}
		autoClose?: number
		showOnce?: boolean
		doNotShowAfterSubmit?: boolean
		customFormUrl?: string
		hiddenFields?: {
			[key: string]: any
		}
		onOpen?: () => void
		onClose?: () => void
		onPageView?: (page: number) => void
		onSubmit?: (payload: any) => void
	}

	interface Window {
		Intercom: (string, string) => void
		dataLayer: Array
		beamer_config: {
			language: string
		}
		Tally?: {
			openPopup: (id: string, options: PopupOptions) => void
			closePopup: (id: string) => void
		}
    echo: Echo<any> | undefined
	}

	interface ImportMeta {
		env: {
			NODE_ENV: string
			VITE_APP_DEFAULT_LOCALE: string
			VITE_APP_FALLBACK_LOCALE: string
			VITE_APP_API_URL: string
			VITE_APP_FREEMIUM_URL: string
			VITE_APP_FREEMIUM_API_URL: string
			VITE_APP_FREEMIUM_SECRET: string
			VITE_APP_PUSHER_APP_ID: string
			VITE_APP_PUSHER_APP_KEY: string
			VITE_APP_PUSHER_APP_SECRET: string
			VITE_APP_PUSHER_APP_CLUSTER: string
			VITE_APP_ROLLBAR_TOKEN: string
			VITE_APP_TEST_PARTNER_USER_LOGIN: string
			VITE_APP_TEST_PARTNER_USER_PASSWORD: string
			VITE_APP_YANDEX_METRIKA_ID: string
		}
	}
}

export default global
