import type { LinkCardPosition } from './card-position'
import type { ChatbotFrequency } from './chatbot-frequency'
import type { SupporterAlertDuration } from './supporter-alert-duration'

export interface ILinkAlerts {
	goalPosition: LinkCardPosition
	pollPosition: LinkCardPosition
	chatbotFrequency: ChatbotFrequency
	supporterAlertPosition: LinkCardPosition
	supporterAlertDuration: SupporterAlertDuration
}
