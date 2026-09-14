/* eslint-disable no-console */
import * as Sentry from '@sentry/vue'
import { ElMessage } from 'element-plus'

import { ErrorMessage } from '@/core/types'

import { getFirstErrorMessage } from '../client'
import type { ErrorType } from '../client/types'

enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

type LogMessage = string | ErrorMessage

export abstract class Logger {
	static debug (msg: LogMessage | string, showMessage = true, args?: unknown) {
		this.handleLog(msg, LogLevel.DEBUG, showMessage, args)
	}

	static info (msg: LogMessage, showMessage = true, args?: unknown) {
		this.handleLog(msg, LogLevel.INFO, showMessage, args)
	}

	static warning (msg: LogMessage, showMessage = true, args?: unknown) {
		this.handleLog(msg, LogLevel.WARNING, showMessage, args)
	}

	static error (msg: LogMessage, showMessage = true, args?: unknown) {
		this.handleLog(msg, LogLevel.ERROR, showMessage, args)
	}

	static critical (msg: LogMessage, showMessage = true, args?: unknown) {
		this.handleLog(msg, LogLevel.CRITICAL, showMessage, args)
	}

	private static handleLog (msg: LogMessage, level: LogLevel, showMessage: boolean, data?: unknown) {
		this.handleConsole(msg, level, data)
		this.captureError(msg, level, data)
		if (showMessage) {
			this.handleMessage(msg, level, data)
		}
	}

	private static handleConsole (msg: LogMessage, level: LogLevel, data?: unknown) {
		switch (level) {
			case LogLevel.DEBUG:
				console.log('%c' + new Date().toLocaleTimeString('ru') + '%c | ' + msg, 'font-weight: bold', 'font-weight: normal', data)
				break
			case LogLevel.INFO:
				console.info(msg, data)
				break
			case LogLevel.WARNING:
				console.warn(msg, data)
				break
			case LogLevel.ERROR:
			case LogLevel.CRITICAL:
				console.log(msg, data)
				break
		}
	}

	private static handleMessage (message: LogMessage, level: LogLevel, data?: unknown) {
		const appendTo = document.getElementById('app-root') as HTMLElement

		switch (level) {
			case LogLevel.INFO:
				ElMessage.warning({ message, appendTo })
				break
			case LogLevel.ERROR:
			case LogLevel.CRITICAL:
				if (data && typeof data === 'object' && 'message' in data) {
					ElMessage.error({ message: getFirstErrorMessage(data as ErrorType), appendTo })
				}
				else {
					ElMessage.error({ message, appendTo })
				}
				break
		}
	}

	private static captureError (msg: LogMessage, level: LogLevel, data?: unknown) {
		try {
			switch (level) {
				case LogLevel.ERROR:
				case LogLevel.CRITICAL:
					if (!data) {
						Sentry.captureException(new Error(msg))
						return
					}

					if (data instanceof Error) {
						Sentry.captureException(data)
					}
					else if (typeof data === 'object' && 'message' in data && 'code' in data && 'origin' in data) {
						if (data.origin instanceof Error) {
							Sentry.captureException(data.origin)
						}
						else {
							Sentry.captureException(new Error(data.message as string), { extra: { code: data.code, origin: data.origin } })
						}
					}
					else {
						Sentry.captureException(new Error(msg))
					}
			}
		}
		catch (err) {
			console.error('Error sending message to Sentry', err)
		}
	}
}
