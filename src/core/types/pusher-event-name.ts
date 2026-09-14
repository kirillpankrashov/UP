export enum PusherEventName {
	SUBSCRIPTION_COUNT = '.pusher:subscription_count',
	SUBSCRIPTION_SUCCEEDED = '.pusher:subscription_succeeded',
	WIDGET_UPDATED = '.widget.params.updated',
	WIDGET_REFRESH = '.widget.refresh',
	MANUAL_LAUNCH = '.manual.launch',
	AUTO_LAUNCH = '.auto.launch',
	DEMO_REAL_LAUNCH = '.demo.real.launch',
	DEMO_LAUNCH = '.demo.launch',
	DEMO_REFERRAL_LAUNCH = '.demo.referral.launch',
	FETCHING_AD = '.fetching-ad',
	REFERRAL_LAUNCH = '.referral.launch',
	CHATBOT_MESSAGE_SENT = '.chatbot-message-sent',
	FREEMIUM_PREVIEW = '.freemium-preview',
	FREEMIUM_SETUP = '.freemium.params.setup',
	CHATBOT_DISCONNECT = '.chatbot.disconnected',
	CONVERTION_ALERT = '.conversion.alert.approved',
}

export enum PusherDebuggerEventName {
	DEBUGGER_CONNECTION = 'debugger.connection',
	OBS_SETTINGS_DEFAULTS = 'obs.settings.defaults',
	OBS_SETTINGS_CUSTOM = 'obs.settings.custom',
	WIDGET_REFRESH = 'widget.refresh',
  PING_SESSIONS = 'ping.sessions',
  DELETE_SESSION = 'delete.session',
}

export enum PusherDebugEventName {
	OBS_SETTINGS = 'obs.settings',
  SESSION_INIT = 'session.init',
}
