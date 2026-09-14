// import '@/assets/scss/main.scss'
import '@/assets/css/style.css'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'

import { createApp } from 'vue'
// @ts-expect-error: no types for this module
import VMdEditor from '@kangc/v-md-editor'
// @ts-expect-error: no types for this module
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'
// @ts-expect-error: no types for this module
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import * as Sentry from '@sentry/vue'
import { createSentryPiniaPlugin } from '@sentry/vue'
import { createPinia } from 'pinia'
import Prism from 'prismjs'

import { i18n } from '@/core/i18n'
// import { RollbarPlugin } from '@/core/plugins'
import { router } from '@/core/router'
import { ElLoading } from '@/components/element-plus'

import 'moment/dist/locale/ru'
import 'moment/dist/locale/es'
import 'moment/dist/locale/pt'
import 'prismjs/components/prism-json'

import App from '@/App.vue'

VMdEditor.use(vuepressTheme, {
	Prism,
})
VMdEditor.use(createEmojiPlugin())

const pinia = createPinia()
pinia.use(createSentryPiniaPlugin())

const vm = createApp(App)

vm.use(ElLoading)
vm.use(pinia)
vm.use(i18n)
vm.use(router)
vm.use(VMdEditor)

if (window.location.host !== 'dashboard.uplify:8080') {
	Sentry.init({
		app: vm,
		dsn: import.meta.env.VITE_APP_SENTRY_DSN,
		environment: import.meta.env.MODE === 'development' ? 'staging' : 'production',
		release: APP_VERSION,
		sendDefaultPii: true,
		integrations: [
			Sentry.captureConsoleIntegration({ levels: ['error'] }),
			Sentry.replayIntegration({
				networkCaptureBodies: true,
				networkDetailAllowUrls: [
					/https:\/\/streamstack\.cc\/api\/v1\/.*/,
					/https:\/\/staging\.streamstack\.cc\/api\/v1\/.*/,
				],
			}),
		],
		enableLogs: true,
		tracesSampleRate: 1.0,
		replaysSessionSampleRate: 0.1,
		replaysOnErrorSampleRate: 1.0,
		ignoreErrors: [
			'Request failed with status code 401',
			'Failed to fetch dynamically imported module',
		],
		beforeSend: (event) => {
			if (window.location.href.includes('/ads/v1/WGT-')) {
				return null
			}
			return event
		},
	})

	router.isReady().then(() => {
		Sentry.addIntegration(Sentry.browserTracingIntegration({ router }))
	})
}

export { vm }

vm.mount('#app')

