import type { ILogEvent } from '@/core/types'
import { LogEvents } from '@/core/types'

export const LOG_EVENTS_LABELS: Record<string, string> = {
	[LogEvents.UPDATE_WIDGET]: 'Widget updated',
	[LogEvents.WIDGET_REFRESH]: 'Widget refreshed',
	[LogEvents.UNDEFINED_EVENT]: 'Socket undefined event',
	[LogEvents.FETCHED_CREATIVES]: 'Response for ad request',
	[LogEvents.FETCHED_REFERRAL_CREATIVES]: 'Response for Promotion request',
	[LogEvents.FETCHED_DEMO_CREATIVES]: 'Demo-creatives fetched',
	[LogEvents.AUTO_START]: 'Start in auto mode',
	[LogEvents.MANUAL_START]: 'Start in manual mode',
	[LogEvents.DEMO_START]: 'Start in demo mode',
	[LogEvents.FETCHING_AD]: 'Ad request',
	[LogEvents.CHATBOT_MESSAGE_SENT]: 'Chatbot message sent',
	[LogEvents.CHATBOT_DISCONNECT]: 'Chatbot disconnected',
	[LogEvents.OBS_SETTINGS]: 'OBS settings set',
	[LogEvents.WIDGET_RELOADED]: 'Widget reloaded',
	[LogEvents.OBS_SETTINGS_DEFAULTS]: 'OBS settings defaults received',
	[LogEvents.OBS_SETTINGS_CUSTOM]: 'OBS custom settings received',
	[LogEvents.SESSION_INIT]: 'Session initialized',
	[LogEvents.PING_SESSIONS]: 'Ping sessions',
	[LogEvents.DELETE_SESSION]: 'Delete session',
}

export function getEventLabel (event: ILogEvent): string {
	return LOG_EVENTS_LABELS[event.event] || 'Unknown event'
}
