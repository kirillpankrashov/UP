import { type Plugin } from 'vue'
import Rollbar, { type LogArgument } from 'rollbar'

import { DomainURL } from '@/core/types'


const rollbarIgnoredMessages = [
	'Script error.', // https://docs.rollbar.com/docs/unknown-script-error
	'SetEvent is not defined',
	'OnSceneLoad is not defined',
]

const enableRollBar = () => {
	switch (window.location.origin) {
		case DomainURL.LOCAL:
		case DomainURL.LOCAL_S:
		case DomainURL.LOCAL_DOMAIN:
		case DomainURL.LOCAL_DOMAIN_S:
		case DomainURL.ALPHA:
		case DomainURL.BETA:
		case DomainURL.RELEASE:
			return false
		default:
			return true
	}
}

const rollbar = new Rollbar({
	enabled: enableRollBar(),
	accessToken: import.meta.env.VITE_APP_ROLLBAR_TOKEN,
	captureUncaught: true,
	captureUnhandledRejections: true,
	environment: window.location.host,
	captureIp: true,
	codeVersion: APP_VERSION,
	ignoredMessages: rollbarIgnoredMessages,
})

export const RollbarPlugin: Plugin = {
	install(app) {
		app.config.errorHandler = (error, vm, info) => {
			rollbar.error(error as LogArgument, { vueComponent: vm, info })
			// eslint-disable-next-line no-console
			console.error(error)
		}
		app.config.globalProperties.$rollbar = rollbar
		app.provide('rollbar', rollbar)
	},
}
