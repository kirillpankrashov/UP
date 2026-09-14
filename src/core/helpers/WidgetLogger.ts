import moment from 'moment'

import {
	AdvertisingMode,
	type ILogEvent,
	LogEvents,
	PusherDebugEventName,
	PusherDebuggerEventName,
} from '@/core/types'
import { PusherEventName } from '@/core/types'
import { responseToWidgetAdapter } from '@/modules/Widget/adapters/widget'
import { defaultWidget } from '@/modules/Widget/constants/default-widget'
import { type IWidget } from '@/modules/Widget/types'

import { CachedLog } from './CachedLog'

export class WidgetLogger {
	slug: string
	log: Array<ILogEvent> = []
	widget: IWidget = defaultWidget
	mode: AdvertisingMode = AdvertisingMode.AUTO
	cachedLog = new CachedLog()
	onPushLog?: () => void

	constructor (slug: string, params: { onPushLog?: () => void }) {
		this.slug = slug
		this.log = this.cachedLog.get(this.slug)
		this.onPushLog = params?.onPushLog
	}

	get value () {
		return this.log
	}

	set value (value) {
		this.log = value
	}

	setMode (mode: AdvertisingMode) {
		this.mode = mode
	}

	handleEvent (event: PusherEventName | PusherDebugEventName | PusherDebuggerEventName, payload: any) {
		let newWidget

		switch (event) {
			case PusherEventName.WIDGET_UPDATED:
				delete payload.status

				newWidget = responseToWidgetAdapter(payload)

				if (!this.compareWidgets({ ...newWidget }, { ...this.widget })) {
					this.pushLog(LogEvents.UPDATE_WIDGET, {
						event,
						payload: newWidget,
						oldWidget: this.widget,
					})
					this.widget = newWidget
				}
				break

			case PusherEventName.WIDGET_REFRESH:
				this.pushLog(LogEvents.WIDGET_REFRESH, { event, payload })
				break

			case PusherEventName.MANUAL_LAUNCH:
				this.pushLog(LogEvents.MANUAL_START, { event, payload })
				break

			case PusherEventName.AUTO_LAUNCH:
				this.pushLog(LogEvents.FETCHED_CREATIVES, { event, payload })
				if (this.mode === AdvertisingMode.AUTO && payload.status) {
					this.pushLog(LogEvents.AUTO_START, { event })
				}
				break

			case PusherEventName.REFERRAL_LAUNCH:
				this.pushLog(LogEvents.FETCHED_REFERRAL_CREATIVES, { event, payload })
				if (this.mode === AdvertisingMode.AUTO && payload.status) {
					this.pushLog(LogEvents.AUTO_START, { event })
				}
				break

			case PusherEventName.DEMO_LAUNCH:
				this.pushLog(LogEvents.FETCHED_DEMO_CREATIVES, { event, payload })
				this.pushLog(LogEvents.DEMO_START, { event, payload })
				break

			case PusherEventName.CHATBOT_MESSAGE_SENT:
				this.pushLog(LogEvents.CHATBOT_MESSAGE_SENT, { event, payload })
				break

			case PusherEventName.CHATBOT_DISCONNECT:
				this.pushLog(LogEvents.CHATBOT_DISCONNECT, { event, payload })
				break

			case PusherEventName.FETCHING_AD:
				this.pushLog(LogEvents.FETCHING_AD, { event, payload })
				break

			case PusherDebugEventName.OBS_SETTINGS:
				this.pushLog(LogEvents.OBS_SETTINGS, { event, payload })
				break

			case PusherDebugEventName.SESSION_INIT:
				this.pushLog(LogEvents.SESSION_INIT, { event, payload })
				break

			case PusherDebuggerEventName.PING_SESSIONS:
				this.pushLog(LogEvents.PING_SESSIONS, { event, payload })
				break

			case PusherDebuggerEventName.WIDGET_REFRESH:
				this.pushLog(LogEvents.WIDGET_RELOADED, { event, payload })
				break

			case PusherDebuggerEventName.OBS_SETTINGS_DEFAULTS:
				this.pushLog(LogEvents.OBS_SETTINGS_DEFAULTS, { event, payload })
				break

			case PusherDebuggerEventName.OBS_SETTINGS_CUSTOM:
				this.pushLog(LogEvents.OBS_SETTINGS_CUSTOM, { event, payload })
				break

			case PusherDebuggerEventName.DELETE_SESSION:
				this.pushLog(LogEvents.DELETE_SESSION, { event, payload })
				break

			default: break
		}
	}

	compareWidgets (widget: IWidget, oldWidget: IWidget) {
		widget.streamer = null
		oldWidget.streamer = null

		return JSON.stringify(widget) === JSON.stringify(oldWidget)
	}

	pushLog (
		event: LogEvents,
		{
			payload,
			// creatives,
			oldWidget,

		}: any,
	) {
		const dateTime = moment().format('HH:mm:ss')

		const logEntry: any = {
			dateTime,
			event,
			payload,
		}

		// Only add oldWidget for UPDATE_WIDGET events
		if (event === LogEvents.UPDATE_WIDGET && oldWidget) {
			logEntry.oldWidget = oldWidget
		}

		this.log.push(logEntry)
		this.cachedLog.save(this.slug, this.log)
		if (this.onPushLog) {
			this.onPushLog()
		}
	}

	deleteLog () {
		this.cachedLog.delete(this.slug)
	}
}
